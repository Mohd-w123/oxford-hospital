import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getSiteContent, updateSiteContent } from '@/lib/content-store';
import { Doctor } from '@/lib/types';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const content = await getSiteContent();
    return NextResponse.json(
      { doctors: content.doctors || [] },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate'
        }
      }
    );
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch doctors' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const newDoc: Omit<Doctor, 'id'> = await request.json();
    const content = await getSiteContent();
    const doctor: Doctor = {
      ...newDoc,
      id: `doc-${Date.now()}`
    };
    content.doctors.push(doctor);
    await updateSiteContent(content);

    revalidatePath('/', 'layout');
    revalidatePath('/');
    revalidatePath('/doctors');
    revalidatePath('/appointment');

    return NextResponse.json({ success: true, doctor }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add doctor' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const updatedDoc: Doctor = await request.json();
    const content = await getSiteContent();
    const index = content.doctors.findIndex((d) => d.id === updatedDoc.id);
    if (index === -1) {
      return NextResponse.json({ error: 'Doctor not found' }, { status: 404 });
    }
    content.doctors[index] = updatedDoc;
    await updateSiteContent(content);

    revalidatePath('/', 'layout');
    revalidatePath('/');
    revalidatePath('/doctors');
    revalidatePath('/appointment');

    return NextResponse.json({ success: true, doctor: updatedDoc });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update doctor' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'Missing ID' }, { status: 400 });
    const content = await getSiteContent();
    content.doctors = content.doctors.filter((d) => d.id !== id);
    await updateSiteContent(content);

    revalidatePath('/', 'layout');
    revalidatePath('/');
    revalidatePath('/doctors');
    revalidatePath('/appointment');

    return NextResponse.json({ success: true, message: 'Doctor deleted' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete doctor' }, { status: 500 });
  }
}
