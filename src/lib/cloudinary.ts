import { v2 as cloudinary } from 'cloudinary'

// Configure Cloudinary with environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
})

export { cloudinary }

// Types for upload results
export type UploadResult = {
  secure_url: string
  public_id: string
  width: number
  height: number
  bytes: number
  format: string
  created_at: string
}

// Validate that Cloudinary is configured
export function isCloudinaryConfigured(): boolean {
  return !!(
    process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET
  )
}

// Upload an image buffer to Cloudinary
export async function uploadImage(
  buffer: Buffer,
  folder: string = 'velvet-mx/general'
): Promise<UploadResult> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: 'image',
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
        transformation: [
          { quality: 'auto:good', fetch_format: 'auto' },
        ],
      },
      (error, result) => {
        if (error) {
          reject(error)
        } else if (result) {
          resolve({
            secure_url: result.secure_url,
            public_id: result.public_id,
            width: result.width,
            height: result.height,
            bytes: result.bytes,
            format: result.format,
            created_at: result.created_at,
          })
        } else {
          reject(new Error('No result from Cloudinary upload'))
        }
      }
    )

    uploadStream.end(buffer)
  })
}

// Delete an image by public_id
export async function deleteImage(publicId: string): Promise<void> {
  await cloudinary.uploader.destroy(publicId)
}

// Generate a signed URL for private assets (if needed later)
export function getSignedUrl(publicId: string, expiresInSeconds: number = 3600): string {
  return cloudinary.url(publicId, {
    sign_url: true,
    expires_at: Math.floor(Date.now() / 1000) + expiresInSeconds,
  })
}
