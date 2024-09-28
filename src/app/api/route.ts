// app/api/ocr/route.ts
import { Buffer } from 'node:buffer';

import { ImageAnnotatorClient } from '@google-cloud/vision';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

// Decode the base64 string and parse JSON
const googleCredentials = process.env.GOOGLE_CLOUD_KEY
  ? JSON.parse(Buffer.from(process.env.GOOGLE_CLOUD_KEY, 'base64').toString('utf-8'))
  : null;

if (!googleCredentials) {
  throw new Error('Google Cloud credentials not found.');
}

// Initialize Google Cloud Vision client with credentials from environment variables
const client = new ImageAnnotatorClient({
  credentials: {
    client_email: googleCredentials.client_email,
    private_key: googleCredentials.private_key,
  },
  projectId: googleCredentials.project_id,
});

export async function POST(req: NextRequest) {
  try {
    // Optional: Simulate network delay if 'delay' query parameter is present
    const delay = req.nextUrl.searchParams.get('delay');
    if (delay && !Number.isNaN(Number(delay))) {
      await new Promise(resolve => setTimeout(resolve, Number(delay)));
    }

    // Parse the form data
    const formData = await req.formData();
    const imageFile = formData.get('image') as File;

    if (!imageFile) {
      return NextResponse.json({ error: 'No image file provided.' }, { status: 400 });
    }

    // Validate file type
    if (!imageFile.type.startsWith('image/')) {
      return NextResponse.json({ error: 'Only image files are allowed.' }, { status: 400 });
    }

    // Validate file size (e.g., max 5MB)
    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
    if (imageFile.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: 'File size exceeds 5MB.' }, { status: 400 });
    }

    // Read the image file as a buffer
    const arrayBuffer = await imageFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Perform OCR using Google Cloud Vision
    const [result] = await client.textDetection(buffer);
    const detections = result.textAnnotations;
    const extractedText
      = detections && detections.length > 0 && detections[0] && detections[0].description
        ? detections[0].description
        : 'No text found.';

    return NextResponse.json({ text: extractedText });
  } catch (error) {
    console.error('OCR Error:', error);
    return NextResponse.json({ error: 'OCR processing failed.' }, { status: 500 });
  }
}
