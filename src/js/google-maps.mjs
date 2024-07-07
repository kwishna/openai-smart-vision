
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
        content: `You're an expert map and direction finder. You can read the roads, streets, and other locations on the map.
        Based on the complex queries and conditions given by the user and the map provided. You suggest the user to reach at the destination.
        You must not generate the lengthy response. Instead, you should respond in a given format:
        
        Output format:
        [ORIGIN] --> Straight Towards XYZ road --> Right turn toward ABC street --> Left turn toward DEF street --> [DESTINATION]`,
      },
      {
        role: "user",
        content: [
          {
            type: "text",
            text:
              `Based on the given map guide me to reach my destination. You must follow the given conditions:

              1. You should only look for path to the destination through the inner streets.
              2. You should avoid road as much as you can. Unless, there is no other option available.
              3. Use nearest Park name, Shop name, Street name, or any other name you can think of, to guide the user.
              4. If the location name is written in any other language than English, you should translate it.
              
              ORIGIN: Srivinayaka Theatre.
              DESTINASION: Brookefield Mall.`,
          },
          {
            type: "image_url",
            image_url: {
              "url": get_image_base64(resolve("./images/google-maps.PNG"))
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
  "id": "chatcmpl-9QblyWvpbrzAqnHn4u3AaVlt7LfG3",
  "object": "chat.completion",
  "created": 1716128754,
  "model": "gpt-4o-2024-05-13",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "[Srivinayaka Theatre] --> Straight Towards 1st Cross Rd No 1 --> Left turn toward 2nd Cross Rd --> Right turn on to 12th Main Rd --> Left turn toward 7th Cross Rd --> Right turn on to 9th Main Rd --> Left turn toward 1st Cross Rd --> Continue straight towards 1st Main Rd --> Continue straight until reaching Nisarga Park --> Continue straight towards AECS Layout Main Rd --> Continue straight towards Brookefield Mall --> [Brookefield Mall]"
      },
      "logprobs": null,
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 1690,
    "completion_tokens": 106,
    "total_tokens": 1796
  },
  "system_fingerprint": "fp_927397958d"
}

[Srivinayaka Theatre] 
 --> Straight Towards 1st Cross Rd No 1
 --> Left turn toward 2nd Cross Rd
 --> Right turn on to 12th Main Rd
 --> Left turn toward 7th Cross Rd
 --> Right turn on to 9th Main Rd
 --> Left turn toward 1st Cross Rd
 --> Continue straight towards 1st Main Rd
 --> Continue straight until reaching Nisarga Park
 --> Continue straight towards AECS Layout Main Rd
 --> Continue straight towards Brookefield Mall
 --> [Brookefield Mall]

*/