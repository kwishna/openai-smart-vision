
import OpenAI from 'openai'
import dotenv from 'dotenv'
import path, { resolve } from 'path'
import { get_image_base64 } from "./utils.mjs"

dotenv.config({ path: path.resolve('./.env') });

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function main() {
  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: `You're an expert vision assistant AI assistant. You can identify the text in an image, its font as-well.`
      },
      {
        role: "user",
        content: [
          {
            type: "text",
            text:
              `Indentify the font details of the text present in the image.`,
          },
          {
            type: "image_url",
            image_url: {
              "url": get_image_base64(resolve("./images/font.PNG"))
            },
          }
        ],
      },
    ],
  });

  console.log(JSON.stringify(response, null, 2));
  console.log(response.choices[0].message.content);
}

main().then().catch(error => console.error(error));

/*
{
  "id": "chatcmpl-9PEdbBNnHhqlrp4CoegtGlE5n6t7G",
  "object": "chat.completion",
  "created": 1715801495,
  "model": "gpt-4o-2024-05-13",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "The font used in the image appears to be a monospaced font, which is common for code editors and development environments. A specific example of such a font is \"Consolas\". Other popular monospaced fonts that might have a similar appearance include \"Courier New\", \"Source Code Pro\", \"Fira Code\", and \"Monaco\". \n\nMonospaced fonts are designed so that each character takes up the same amount of horizontal space, which is particularly useful for coding as it ensures alignment and readability of code blocks."
      },
      "logprobs": null,
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 472,
    "completion_tokens": 106,
    "total_tokens": 578
  },
  "system_fingerprint": "fp_927397958d"
}
The font used in the image appears to be a monospaced font, which is common for code editors and development environments. A specific example of such a font is "Consolas". Other popular monospaced fonts that might have a similar appearance include "Courier New", "Source Code Pro", "Fira Code", and "Monaco". 

Monospaced fonts are designed so that each character takes up the same amount of horizontal space, which is particularly useful for coding as it ensures alignment and readability of code blocks.
*/

