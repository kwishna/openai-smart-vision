
import OpenAI from 'openai'
import dotenv from 'dotenv'
import path, { resolve } from 'path'
import { get_image_base64 } from "./utils.mjs"

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
        content: "You are an smart vision AI assistant with eagle eyes." +
          "You are very good at reading images and spoting physicaldifferences between them. You will be given 2 images, you should carefully observe them, " +
          "and find out if there are differences between them at the any part of the image." +
          "You should ensure that the differences are clearly visible through human naked eyes instead of being ambigious."
      },
      {
        role: "user",
        content: [
          {
            type: "text",
            text:
              "You should list down at least 5 differences between the given two images in bullet points.",
          },
          {
            type: "image_url",
            image_url: {
              "url": get_image_base64(resolve("./images/image_diff_one.PNG")),
            },
          },
          {
            type: "image_url",
            image_url: {
              "url": get_image_base64(resolve("./images/image_diff_two.PNG")),
            },
          },
        ],
      },
    ],
  });

  console.log(JSON.stringify(response, null, 2));
  /*

    {
      "id": "chatcmpl-9PCDYjWhsYiv5BrqHRvTYEJtG5ZtG",
      "object": "chat.completion",
      "created": 1715792192,
      "model": "gpt-4o-2024-05-13",
      "choices": [
        {
          "index": 0,
          "message": {
            "role": "assistant",
            "content": "The images depict the same scene:\n\nA woman in kitchen attire poses in a stylized and confident manner. She’s wearing a green polka-dotted top, a pink apron, a red headband with a bow, and yellow cleaning gloves. In the background, there are kitchen items including a microwave, jars, and loaves of bread on the counter.\n\nThe primary difference between the two images is the woman's facial expression and minor variations in her posture. In the first image, her mouth is open wider and she has a slightly different expression compared to the second image. Additionally, the second image appears to be cropped slightly lower, including a bit more of her legs and the countertop behind her."
          },
          "logprobs": null,
          "finish_reason": "stop"
        }
      ],
      "usage": {
        "prompt_tokens": 1578,
        "completion_tokens": 139,
        "total_tokens": 1717
      },
      "system_fingerprint": "fp_927397958d"
    }


    "The images show a woman in a kitchen, dressed in a green polka dot blouse, a pink apron, and yellow cleaning gloves.
    She is posing with a humorous, determined expression and a flexed arm, reminiscent of the \"We Can Do It!\" poster.
    
    Here are some differences between the two images:
    1. **Color of Headband**: In the first image, her headband is red. In the second image, her headband is red with black polka dots.
    2. **Tattoo Visibility**: In the second image, her tattoo is slightly more exposed compared to the first image.
    3. **Lip Color**: In the first image, her lipstick color is purple. In the second image, it is red.
    4. **Position of Loaf of Bread**: The loaf of bread is differently positioned in the two images. In the first image, a loaf is tilted to the left. In the second image, it’s more straight.
    5. **Bread Crumbs**: There are bread crumbs visible on the tabletop in the second image which are not present in the first image.
    
    These small details differentiate the two images."

  */
}

main().then().catch(error => console.error(error));

