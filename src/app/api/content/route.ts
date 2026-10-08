import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getSiteContent, updateSiteContent } from '@/lib/content-store';
import { SiteContent } from '@/lib/types';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const content = await getSiteContent();
    return NextResponse.json(content, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate'
      }
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch content' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body: SiteContent = await request.json();
    await updateSiteContent(body);

    revalidatePath('/', 'layout');
    revalidatePath('/');
    revalidatePath('/doctors');
    revalidatePath('/services');
    revalidatePath('/facilities');
    revalidatePath('/gallery');
    revalidatePath('/about');
    revalidatePath('/contact');
    revalidatePath('/appointment');

    return NextResponse.json({ success: true, message: 'Content updated successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save content' }, { status: 500 });
  }
}
