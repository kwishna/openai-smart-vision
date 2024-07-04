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
            "content": "You are an expert Nutritionist, who has vast knowledge about different foods and nutrition."
        },
        {
            "role": "user",
            "content":
                [
                    {
                        "type": "text", "text":
                        """
                            Based on the given image of a bowl of fruits. You should observe the different fruits and their variety and size.
                            You should answer the following queries based on your understanding of the image.
                            
                            1. List all the fruits and approx size and weight of each of the fruit.
                            2. List down the amount of the calories in each of the fruit.
                            3. Calculate the total amount of calories in the bowl.
                            
                            Ensure that you answer them in well-formatted manner in different sections.
                        """
                    },
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": image_to_base64(get_from_relative_path("../../images/bowl_of_fruits.png"))
                        }
                    }
                ]
        }
    ]
)

print(comp)
print(comp.choices[0].message.content)

"""
### 1. List of Fruits and Approximate Size

Upon observing the image, the bowl contains the following fruits:

1. Bananas (2)
   - Approximate size: 7-8 inches each
2. Green Apples (2)
   - Approximate size: Medium, about 3 inches in diameter
3. Red Apples (1)
   - Approximate size: Medium, about 3 inches in diameter
4. Oranges (4)
   - Approximate size: Small to medium, about 2.5-3 inches in diameter
5. Plums (2)
   - Approximate size: Medium, about 2 inches in diameter

### 2. Amount of Calories in Each Fruit

Here is the approximate calorie content for each fruit:

1. **Banana**: 
   - Calories: 105 per banana
2. **Green Apple**:
   - Calories: 95 per apple
3. **Red Apple**:
   - Calories: 95 per apple
4. **Orange**:
   - Calories: 62 per orange
5. **Plum**:
   - Calories: 30 per plum

### 3. Total Amount of Calories in the Bowl

Now, let's calculate the total calories:

- **Bananas**: 2 bananas × 105 calories = 210 calories
- **Green Apples**: 2 apples × 95 calories = 190 calories
- **Red Apple**: 1 apple × 95 calories = 95 calories
- **Oranges**: 4 oranges × 62 calories = 248 calories
- **Plums**: 2 plums × 30 calories = 60 calories

**Total Calories in the Bowl**: 
210 + 190 + 95 + 248 + 60 = 803 calories

### Summary

- **Total Fruits**: 
  - Bananas: 2
  - Green Apples: 2
  - Red Apple: 1
  - Oranges: 4
  - Plums: 2

- **Total Calories**: 803 calories

This is an estimated total based on the typical calorie content and size of each fruit.
"""
