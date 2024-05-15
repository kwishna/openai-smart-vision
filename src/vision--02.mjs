
import OpenAI from 'openai'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve('./.env') });

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

/**
 * Sends a chat completion request to the OpenAI API and logs the response.
 *
 * This function takes two images as input and sends a chat completion request to the OpenAI API,
 * asking what the images contain and if there is any difference between them. The response from
 * the API is then logged to the console.
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
          {
            type: "text",
            text:
              "What are in these images? Is there any difference between them?",
          },
          {
            type: "image_url",
            image_url: {
              "url":
                "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg",
            },
          },
          {
            type: "image_url",
            image_url: {
              "url":
                "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg",
            },
          },
        ],
      },
    ],
  });
  console.log(response);
}
main();