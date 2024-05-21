import dotenv
import openai

from utils import generate_every_50th_frame

dotenv.load_dotenv()

for frame in generate_every_50th_frame("../../images/test.mp4"):
    comp = openai.chat.completions.create(
        model="gpt-4o",
        temperature=0.7,
        messages=[
            {
                "role": "system",
                "content": "You are a Vision AI assistant. You has the capabilities to analyze an image."
            },
            {
                "role": "assistant",
                "content": "Please provide an image. I am read it carefully and answer your queries."
            },
            {
                "role": "user",
                "content":
                    [
                        {
                            "type": "text", "text": "I am going to provide you an image. Please describe it."
                        },
                        {
                            "type": "image_url",
                            "image_url": {
                                "url": "data:image/png;base64," + frame
                            }
                        }
                    ]
            }
        ]
    )

    print(comp.choices[0].message.content)
    print("---------------------------------------------------------------------")