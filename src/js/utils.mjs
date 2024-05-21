import fs from 'fs'

/**
 * Converts an image file to a base64-encoded data URL.
 *
 * @param {string} image_path - The file path of the image to be converted.
 * @returns {string} The base64-encoded data URL of the image.
 */
export function get_image_base64(image_path) {
    const base64Img = fs.readFileSync(image_path, "base64");
    return `data:image/png;base64,${base64Img}`;
  }
  