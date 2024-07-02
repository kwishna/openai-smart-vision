
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
        content: `You're visitor to an Arabic nation where most of the people speak, write and understand Arabic. You are also a scientisit and researcher.`,
      },
      {
        role: "user",
        content: [
          {
            type: "text",
            text:`You visited an art museum where you saw some Arabic text written.
            Instead of translating it word-by-word, You should try to understand it from scientific lens.
            If there is any scientific maravel you should try to explain it to them.
            Else, if there's any scientific error you should clarify the same to the audience.
            In any of case, you should provide real-life example to convince the people.
            Please stick to the point, avoid making up the things.`,
          },
          {
            type: "image_url",
            image_url: {
              "url": get_image_base64(resolve("./images/arabic-text.png"))
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
  "id": "chatcmpl-9QcohtlOTt5Olq3knnnH8E7Rt0rJU",
  "object": "chat.completion",
  "created": 1716132767,
  "model": "gpt-4o-2024-05-13",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "The Arabic text states: \"أكبر كوكب في النظام الشمسي هو كوكب المشتري\" which translates to \"The largest planet in the solar system is Jupiter.\"\n\nFrom a scientific point of view, this statement is accurate. Jupiter is indeed the largest planet in the solar system, with a diameter of about 142,984 kilometers (88,846 miles), making it more than 11 times the diameter of Earth.\n\nTo provide a real-life example to convince people, consider this: If Earth were the size of a grape, Jupiter would be roughly the size of a basketball. Jupiter's vast size and massive gravitational pull have significant impacts on its surroundings. For instance, its strong gravity helps to protect the inner planets, including Earth, by redirecting comets and asteroids that might otherwise collide with them.\n\nThis is a fascinating fact that highlights both the grandeur and complexity of our solar system."
      },
      "logprobs": null,
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 389,
    "completion_tokens": 184,
    "total_tokens": 573
  },
  "system_fingerprint": "fp_927397958d"
}
The Arabic text states: "أكبر كوكب في النظام الشمسي هو كوكب المشتري" which translates to "The largest planet in the solar system is Jupiter."

From a scientific point of view, this statement is accurate. Jupiter is indeed the largest planet in the solar system, with a diameter of about 142,984 kilometers (88,846 miles), making it more than 11 times the diameter of Earth.

To provide a real-life example to convince people, consider this: If Earth were the size of a grape, Jupiter would be roughly the size of a basketball. Jupiter's vast size and massive gravitational pull have significant impacts on its surroundings. For instance, its strong gravity helps to protect the inner planets, including Earth, by redirecting comets and asteroids that might otherwise collide with them.

This is a fascinating fact that highlights both the grandeur and complexity of our solar system.
*/