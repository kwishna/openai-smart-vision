import fs from 'fs'
import * as ffmpeg from 'ffmpeg-node';
import * as Base64 from 'js-base64';
import * as cv from 'opencv4nodejs';
import * as Base64 from 'js-base64';

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


/**
 * Generate frame-by-frame for the videos.
 */
export function streamVideoFrames(videoPath: string): Generator<{ frameNumber: number, base64Frame: string }> {
  return (function* () {
    const stream = ffmpeg()
      .input(videoPath)
      .outputOptions(['-f image2pipe', '-vcodec mjpeg', '-an'])
      .output('-');

    let frameCount = 0;
    let frameNumber = 0;

    stream.on('data', (data: Buffer) => {
      frameCount++;
      if (frameCount % 50 === 0) {
        frameNumber++;
        const base64Frame = Base64.fromByteArray(data);
        yield { frameNumber, base64Frame };
      }
    });

    stream.on('end', () => {
      console.log('Video stream ended');
    });

    stream.on('error', (err: Error) => {
      console.error('Error:', err);
    });
  })();
}

/**
 * Using `opencv4nodejs` stream frames of the video
 */
function streamVideoFrames(videoPath: string): Generator<{ frameNumber: number, base64Frame: string }> {
  return (function* () {
    const cap = new cv.VideoCapture(videoPath);

    let frameCount = 0;
    let frameNumber = 0;

    while (true) {
      const frame = cap.read();

      if (frame.empty) {
        break;
      }

      frameCount++;
      if (frameCount % 50 === 0) {
        frameNumber++;
        const buffer = cv.imencode('.jpg', frame);
        const base64Frame = Base64.fromByteArray(buffer);
        yield { frameNumber, base64Frame };
      }
    }

    cap.release();
  })();
}
