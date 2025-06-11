import { Area } from 'react-easy-crop';

/**
 * Creates an image element from a URL
 *
 * By creating an image element, we can use it to draw onto a canvas
 * @param {string} url - The URL of the image
 * @returns {Promise<HTMLImageElement>} A promise that resolves to the image element
 */
export const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => {
      console.error('Error loading image:', error);
      reject(error);
    });

    // Try to load with crossOrigin first
    try {
      image.setAttribute('crossOrigin', 'anonymous');
      image.src = url;
    } catch (error) {
      // If crossOrigin fails, try without it
      console.warn('CrossOrigin failed, trying without:', error);
      image.removeAttribute('crossOrigin');
      image.src = url;
    }
  });

/**
 * Crops an image
 *
 * First creates an image element from a URL
 * Then creates a canvas element
 * Then draws the image onto the canvas
 * Then creates a file from the canvas
 * @param {string} imageSrc - The source of the image
 * @param {Area} pixelCrop - The pixel crop
 * @returns {Promise<File>} A promise that resolves to the cropped image
 */
export async function getCroppedImg(
  imageSrc: string,
  pixelCrop: Area
): Promise<File> {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('No 2d context');
  }

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  // Convert the canvas to a blob (which is then converted to a file)
  return new Promise<File>((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error('Canvas is empty'));
          return;
        }
        const file = new File([blob], 'cropped-avatar.jpg', {
          type: 'image/jpeg',
          lastModified: Date.now(),
        });
        resolve(file);
      },
      'image/jpeg',
      0.95
    );
  });
}
