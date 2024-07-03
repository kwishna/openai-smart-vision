
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
        content: `You're an expert child doctor who is also expert in understanding childrens' emotions & body-language.
        You can also suggest the ways to make the children feel better.`
      },
      {
        role: "user",
        content: [
          {
            type: "text",
            text:
              `Analyze the given picture about my daughter. I wasn't sure, what she is looking for, neither she's expressing her feelings.
              I want you to try to understand her body-language and facial expression. Also, suggest some ideas to make her feel more comfortable.`,
          },
          {
            type: "image_url",
            image_url: {
              "url": get_image_base64(resolve("./images/baby-picture.PNG"))
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
  "id": "chatcmpl-9QbETvDGj7zb69g70J8WjJDFNMI1l",
  "object": "chat.completion",
  "created": 1716126677,
  "model": "gpt-4o-2024-05-13",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "Your daughter looks very well-dressed and beautifully adorned in traditional attire. Judging by her facial expression and body language, here are a few observations:
        
        1. **Facial Expression**: Her expression is somewhat neutral with a hint of a smile, which could suggest a range of emotions from contentment to slight confusion or curiosity.
        She doesn't seem to be expressing any extreme emotions like distress or excitement.
        
        2. **Body Language**: Her posture seems upright but relaxed, which usually means she isn't feeling any immediate discomfort or distress.

        However, the elaborate attire might be a bit heavy or cumbersome for her, which could make her feel slightly uncomfortable or restrained.
        
        ### Suggestions to Make Her Feel More Comfortable:
        
        1. **Engage and Communicate**: Ask her simple questions about how she's feeling.
        Questions like \"Are you enjoying your dress?\" or \"Is there something you want to do right now?\" might help her express any discomfort or desires she might have.
        
        2. **Physical Comfort**: Ensure that she is physically comfortable in her attire. If the clothing or accessories are too tight or heavy, consider making adjustments.
        Softly ask if anything feels uncomfortable or if she needs a break.
        
        3. **Create a Comfort Zone**: If she seems overwhelmed, try to create a safe and comfortable spot for her to relax.
        This could be a quieter area away from the crowd where she can take a breather.
        
        4. **Distraction with Fun Activities**: Engage her in something fun that she enjoys, like playing with a favorite toy, a little game, or a story.
        This could help shift her focus and make her feel more at ease.
        
        5. **Affection and Reassurance**: Sometimes, a simple hug or some gentle reassuring words can do wonders.Let her know that it’s okay to feel however she’s feeling and
        that you’re there for her.
        
        6. **Hydration and Snacks**: Making sure she is well-hydrated and has had something to eat can also help in maintaining her comfort level. Sometimes discomfort can stem from basic needs not being met.
        By observing and communicating with her gently, you can gauge her emotions and help her feel more at ease."
      },
      "logprobs": null,
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 859,
    "completion_tokens": 441,
    "total_tokens": 1300
  },
  "system_fingerprint": "fp_927397958d"
}
Your daughter looks very well-dressed and beautifully adorned in traditional attire. Judging by her facial expression and body language, here are a few observations:

1. **Facial Expression**: Her expression is somewhat neutral with a hint of a smile, which could suggest a range of emotions from contentment to slight confusion or curiosity. She doesn't seem to be expressing any extreme emotions like distress or excitement.

2. **Body Language**: Her posture seems upright but relaxed, which usually means she isn't feeling any immediate discomfort or distress. However, the elaborate attire might be a bit heavy or cumbersome for her, which could make her feel slightly uncomfortable or restrained.

### Suggestions to Make Her Feel More Comfortable:

1. **Engage and Communicate**: Ask her simple questions about how she's feeling. Questions like "Are you enjoying your dress?" or "Is there something you want to do right now?" might help her express any discomfort or desires she might have.

2. **Physical Comfort**: Ensure that she is physically comfortable in her attire. If the clothing or accessories are too tight or heavy, consider making adjustments. Softly ask if anything feels uncomfortable or if she needs a break.

3. **Create a Comfort Zone**: If she seems overwhelmed, try to create a safe and comfortable spot for her to relax. This could be a quieter area away from the crowd where she can take a breather.

4. **Distraction with Fun Activities**: Engage her in something fun that she enjoys, like playing with a favorite toy, a little game, or a story. This could help shift her focus and make her feel more at ease.

5. **Affection and Reassurance**: Sometimes, a simple hug or some gentle reassuring words can do wonders. Let her know that it’s okay to feel however she’s feeling and that you’re there for her.

6. **Hydration and Snacks**: Making sure she is well-hydrated and has had something to eat can also help in maintaining her comfort level. Sometimes discomfort can stem from basic needs not being met.

By observing and communicating with her gently, you can gauge her emotions and help her feel more at ease.

*/