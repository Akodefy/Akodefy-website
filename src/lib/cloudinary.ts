/**
 * Cloudinary media upload utilities for blog content
 */

const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET

export const isCloudinaryConfigured = (): boolean => {
  return Boolean(CLOUDINARY_CLOUD_NAME && CLOUDINARY_UPLOAD_PRESET)
}

export interface CloudinaryUploadResult {
  secure_url: string
  public_id: string
  format: string
  width: number
  height: number
  bytes: number
}

/**
 * Upload an image file to Cloudinary
 * @param file - File object from file input
 * @param folder - Optional folder path in Cloudinary
 * @returns Upload result with secure URL
 */
export async function uploadImageToCloudinary(
  file: File,
  folder = 'akodefy-blog'
): Promise<CloudinaryUploadResult> {
  if (!isCloudinaryConfigured()) {
    throw new Error('Cloudinary is not configured. Please set environment variables.')
  }

  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET)
  formData.append('folder', folder)

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
    {
      method: 'POST',
      body: formData,
    }
  )

  if (!response.ok) {
    const error = await response.json()
    throw new Error(`Cloudinary upload failed: ${error.error?.message || 'Unknown error'}`)
  }

  const data = await response.json()
  return data
}

/**
 * Generate optimized image URL with transformations
 * @param publicId - Cloudinary public ID
 * @param options - Transformation options
 */
export function getOptimizedImageUrl(
  publicId: string,
  options: {
    width?: number
    height?: number
    crop?: 'fill' | 'fit' | 'scale' | 'limit'
    quality?: 'auto' | number
    format?: 'auto' | 'webp' | 'jpg' | 'png'
  } = {}
): string {
  if (!CLOUDINARY_CLOUD_NAME) return ''

  const { width, height, crop = 'fill', quality = 'auto', format = 'auto' } = options

  let transformation = `q_${quality},f_${format}`

  if (width) transformation += `,w_${width}`
  if (height) transformation += `,h_${height}`
  if (width || height) transformation += `,c_${crop}`

  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/${transformation}/${publicId}`
}

/**
 * Delete an image from Cloudinary
 * Note: This requires server-side implementation with API secret
 * For now, this is a placeholder for future enhancement
 */
export async function deleteImageFromCloudinary(publicId: string): Promise<void> {
  console.warn('Delete operation requires server-side implementation:', publicId)
  // This would need to be implemented on a backend with your API secret
  // For security reasons, deletion cannot be done directly from the frontend
}
