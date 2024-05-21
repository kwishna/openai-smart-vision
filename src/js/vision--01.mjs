
import OpenAI from 'openai'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve('./.env') });

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

/**
 * Sends a request to the OpenAI API to generate a response to an image prompt.
 *
 * @async
 * @function main
 * @returns {Promise<void>} - Resolves when the API response has been logged to the console.
 */
async function main() {
  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: "You are an vision AI assistant. You are very good at reading images. You are also good at talking to you."
      },
      {
        role: "user",
        content: [
          { type: "text", text: "What's in this image?" },
          {
            type: "image_url",
            image_url: {
              "url":
                "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg",
                // "url": `data:image/jpeg;base64,${base64_image}`
                detail: "auto"
            },
          },
        ],
      },
    ],
  });

  console.log(JSON.stringify(response, null, 2));
}

main().then().catch(error => console.error(error));
/*
    {
        "id": "chatcmpl-9OqbKpni0b0HroTLmRGZ1TQllPUiu",
        "object": "chat.completion",
        "created": 1715709098,
        "model": "gpt-4o-2024-05-13",
        "choices": [
            {
            "index": 0,
            "message": {
                "role": "assistant",
                "content": "The image depicts a scenic outdoor landscape featuring a wooden boardwalk that extends into a field of tall green grass. The sky above is bright and mostly clear, with a few scattered clouds creating a picturesque background. There are trees and shrubs in the distance, adding to the natural beauty of the scene. This setting seems peaceful and inviting, perfect for a walk or leisurely stroll."
            },
            "logprobs": null,
            "finish_reason": "stop"
            }
        ],
        "usage": {
            "prompt_tokens": 1117,
            "completion_tokens": 74,
            "total_tokens": 1191
        },
        "system_fingerprint": "fp_927397958d"
    }
*/