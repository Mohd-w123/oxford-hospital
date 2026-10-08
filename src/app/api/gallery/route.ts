import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getSiteContent, updateSiteContent } from '@/lib/content-store';
import { GalleryItem } from '@/lib/types';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function POST(request: Request) {
  try {
    const newItem: Omit<GalleryItem, 'id'> = await request.json();
    const content = await getSiteContent();
    const item: GalleryItem = {
      ...newItem,
      id: `gal-${Date.now()}`
    };
    content.gallery.unshift(item);
    await updateSiteContent(content);

    revalidatePath('/', 'layout');
    revalidatePath('/');
    revalidatePath('/gallery');

    return NextResponse.json({ success: true, item }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add gallery photo' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'Missing ID' }, { status: 400 });
    const content = await getSiteContent();
    content.gallery = content.gallery.filter((g) => g.id !== id);
    await updateSiteContent(content);

    revalidatePath('/', 'layout');
    revalidatePath('/');
    revalidatePath('/gallery');

    return NextResponse.json({ success: true, message: 'Photo deleted' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete photo' }, { status: 500 });
  }
}
