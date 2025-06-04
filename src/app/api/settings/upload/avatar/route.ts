import { mkdir, writeFile } from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const formData = await req.formData();
    const file = formData.get('avatar') as File;
    const email = formData.get('email') as string;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadDir = path.join(process.cwd(), 'public/uploads/avatars');
    await mkdir(uploadDir, { recursive: true });

    const filename = `avatar-${email.replace(
      '@',
      '_'
    )}-${Date.now()}.${file.name.split('.').pop()}`;
    const filepath = path.join(uploadDir, filename);

    await writeFile(filepath, buffer);

    const avatarUrl = `/uploads/avatars/${filename}`;

    return NextResponse.json({ avatarUrl });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
