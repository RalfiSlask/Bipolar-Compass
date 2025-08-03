import { PutObjectCommand } from '@aws-sdk/client-s3';
import { NextRequest, NextResponse } from 'next/server';
import s3Client from '../../../../../../s3Config';

/**
 * @swagger
 * /api/settings/upload/avatar:
 *   post:
 *     summary: Upload user avatar image
 *     description: Uploads a user's avatar image to AWS S3 and returns the public URL
 *     tags:
 *       - Settings
 *       - Avatar
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - avatar
 *               - email
 *             properties:
 *               avatar:
 *                 type: string
 *                 format: binary
 *                 description: The avatar image file to upload (supports common image formats like JPG, PNG, WEBP)
 *                 example: "user-avatar.jpg"
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address used to generate unique filename
 *                 example: "user@example.com"
 *     responses:
 *       200:
 *         description: Avatar uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 avatarUrl:
 *                   type: string
 *                   format: uri
 *                   description: Public URL of the uploaded avatar image
 *                   example: "https://bucket-name.s3.region.amazonaws.com/avatars/avatar-user_example.com-1703123456789.jpg"
 *       400:
 *         description: Bad request - No file uploaded
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "No file uploaded"
 *       401:
 *         description: Unauthorized - Authentication required
 *       500:
 *         description: Internal server error - Upload failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Upload failed"
 *     x-code-samples:
 *       - lang: JavaScript
 *         source: |
 *           const formData = new FormData();
 *           formData.append('avatar', fileInput.files[0]);
 *           formData.append('email', 'user@example.com');
 *
 *           const response = await fetch('/api/settings/upload/avatar', {
 *             method: 'POST',
 *             body: formData
 *           });
 *
 *           const data = await response.json();
 *           console.log('Avatar URL:', data.avatarUrl);
 *       - lang: cURL
 *         source: |
 *           curl -X POST /api/settings/upload/avatar \
 *             -H "Authorization: Bearer YOUR_TOKEN" \
 *             -F "avatar=@/path/to/avatar.jpg" \
 *             -F "email=user@example.com"
 */
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
