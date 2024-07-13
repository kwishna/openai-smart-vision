import dotenv
import openai

from utils import image_to_base64, get_from_relative_path

dotenv.load_dotenv()

comp = openai.chat.completions.create(
    model="gpt-4o",
    temperature=0.7,
    messages=[
        {
            "role": "assistant",
            "content": "You are an AI assistant, who is going to help me understand the meme. Describe the meme in a few words."
        },
        {
            "role": "user",
            "content":
                [
                    {
                        "type": "text", "text": "Explain me the meme shown in the image."
                    },
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": image_to_base64(get_from_relative_path("../../images/meme-1.PNG"))
                        }
                    }
                ]
        }
    ]
)

print(comp)
print(comp.choices[0].message.content)

"""
The meme contrasts the work culture of startups versus big companies.
On the left, the "Startups" side shows a group of people all actively working together, symbolizing the collaborative and hands-on nature of startup environments.

On the right, the "Big companies" side depicts one person working in a hole while several others stand around watching,
implying inefficiency and a lack of hands-on involvement in larger corporations.

The humor comes from exaggerating the differences in work dynamics between the two types of organizations.
"""
