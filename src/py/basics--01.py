import os
import dotenv
import openai
from utils import image_to_base64, get_from_relative_path

dotenv.load_dotenv()

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
                            "url": image_to_base64(get_from_relative_path("../../images/baby-picture.png"))
                        }
                    }
                ]
        }
    ]
)

print(comp)

"""
The image shows a young girl dressed in traditional Indian attire.
She is wearing a colorful saree with a green and gold embroidered pallu (draped portion) over a pink blouse with intricate designs.
Her outfit is accessorized with various pieces of jewelry, including a maang tikka (forehead ornament), earrings, a necklace, bangles, and armlets.
Her hair is styled neatly and adorned with flowers. She has a small red bindi on her forehead and henna designs on her hands.
The background is blurred, suggesting the photo was taken outdoors, possibly at a festive or cultural event.
"""
