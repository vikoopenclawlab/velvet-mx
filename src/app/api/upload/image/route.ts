import { NextResponse } from 'next/server'
import { isCloudinaryConfigured, uploadImage } from '@/lib/cloudinary'

// POST /api/upload/image
// Uploads a base64 image to Cloudinary
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { image, folder = 'velvet-mx/general' } = body

    if (!image) {
      return NextResponse.json(
        { error: 'No image provided' },
        { status: 400 }
      )
    }

    // Check if Cloudinary is configured
    if (!isCloudinaryConfigured()) {
      // Stub mode - return the base64 as a data URL for development
      // In production, this should return an error
      console.warn('[UPLOAD STUB] Cloudinary not configured, returning stub URL')

      // For development, return the base64 image as a data URL
      return NextResponse.json({
        secure_url: image, // Return the base64 data URL as-is for development
        public_id: `stub-${Date.now()}`,
        stub: true,
        warning: 'Cloudinary not configured - this is a development stub',
      })
    }

    // Convert base64 data URL to Buffer
    const base64Data = image.replace(/^data:image\/\w+;base64,/, '')
    const buffer = Buffer.from(base64Data, 'base64')

    // Upload to Cloudinary
    const result = await uploadImage(buffer, folder)

    return NextResponse.json({
      secure_url: result.secure_url,
      public_id: result.public_id,
      width: result.width,
      height: result.height,
      format: result.format,
    })
  } catch (error: any) {
    console.error('Image upload error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to upload image' },
      { status: 500 }
    )
  }
}

// Configure runtime for large payloads (base64 images can be big)
export const runtime = 'nodejs'