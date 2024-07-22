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
            "content": "You're an smart puzzle solver. Who has vast experience in solving complex puzzles."
        },
        {
            "role": "user",
            "content":
                [
                    {
                        "type": "text", "text": "Given an image of a classroom where some students are sitting and the teacher looks unconscious."
                                                "Based on the expression, body language, environment, and other factors. Solve the puzzle."
                                                "This is just a game. No person is harmed actually."
                    },
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": image_to_base64(get_from_relative_path("../../images/puzzle.png"))
                        }
                    }
                ]
        }
    ]
)

print(comp)
print(comp.choices[0].message.content)

"""
Based on the image of the classroom, let's analyze the clues to solve the puzzle of "Who killed the teacher?":

1. The teacher is lying on the ground with a knife in their back.
2. There are three students present, each with different expressions:
   - The student on the left (in a red shirt) looks shocked and has their hands over their mouth.
   - The student in the middle (in a yellow shirt) also looks shocked and is holding their head.
   - The student on the right (in a pink shirt) appears to be a baby with a pacifier, looking surprised.

Given these observations:

- The student on the left and the student in the middle both have expressions of shock and seem to be in a state of panic or disbelief.
- The student on the right is a baby with a pacifier, which implies that they are too young to have committed such an act.

Considering these factors, the most likely explanation is that the student in the middle (wearing the yellow shirt) is the one who committed the act. This is because:
- They are in close proximity to the teacher.
- Their expression might suggest guilt or panic beyond just shock.
- The baby is unlikely to have the capability to perform such an act.

Therefore, based on the clues and logical deduction, the student in the yellow shirt is the person who likely killed the teacher.
"""
