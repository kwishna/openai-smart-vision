import os
import dotenv
import openai
from utils import image_to_base64

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
                            "url": "https://cdn0.weddingwire.in/article/5549/original/960/jpg/79455-indian-bridal-wear-jj-valaya-heavy-red-lehenga.webp"
                        }
                    }
                ]
        }
    ]
)

print(comp)

"""
The image appears to show a woman standing in an elegant, possibly traditional setting, adorned in a luxurious, ornate red and gold lehenga.
The lehenga features intricate embroidery with floral and paisley patterns.
She is accessorized with heavy jewelry including a necklace, earrings, and bracelets, and has a dupatta draped over her shoulder.
The setting includes carved pillars and a polished floor, adding to the regal ambiance of the scene.
The overall composition suggests a traditional or ceremonial occasion such as a wedding.
"""
