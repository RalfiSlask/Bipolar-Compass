import { PutObjectCommand } from '@aws-sdk/client-s3';
import { NextRequest, NextResponse } from 'next/server';
import s3Client from '../../../../../../s3Config';

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

    // We generate a unique filename for the avatar
    const fileExtension = file.name.split('.').pop();
    const filename = `avatars/avatar-${email.replace(
      '@',
      '_'
    )}-${Date.now()}.${fileExtension}`;

    // We upload to our bucket on S3 (AWS)
    const uploadParams = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: filename,
      Body: buffer,
      ContentType: file.type,
    };

    const command = new PutObjectCommand(uploadParams);
    await s3Client.send(command);

    // Construct the public URL
    const avatarUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${filename}`;

    return NextResponse.json({ avatarUrl });
  } catch (error) {
    console.error('S3 Upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
