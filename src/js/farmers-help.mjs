
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
        content: `You're an horticultuure doctor who helps the farmers in identifying the disease in their crop or vegetable. You're highly qualified and expert doctor.
        You should identify the disease by seeing the crop/vegetable.`
      },
      {
        role: "user",
        content: [
          {
            type: "text",
            text:
              `Idenitfy the disease in the given vegetable and generate a report with the following section: 1) Disease, 2) Cure, 3) Severity, 4) Causes, 5) Side effect on consumption by animal or human.`,
          },
          {
            type: "image_url",
            image_url: {
              "url": get_image_base64(resolve("./images/cauliflower-disease.PNG"))
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

// ACTUAL -Buttoning of cauliflower: Cauliflower is a vegetable that is high in vitamin C and vitamin K.
// It also contains a good amount of folate and potassium. Cauliflower can be eaten raw or cooked. Raw cauliflower has a slightly bitter taste, but it is milder when cooked.

/*
Certainly, here's the identification and report based on the provided image:

### 1) Disease
**Condition:** Whiptail

### 2) Cure
**Remedial Measures:**
- **Soil Testing:** Conduct soil tests to determine the molybdenum levels.
- **Fertilization:** Apply fertilizers containing molybdenum to the soil if deficiency is confirmed. Sodium molybdate or ammonium molybdate can be used.
- **Adjust Soil pH:** Molybdenum availability increases with soil pH. Lime the soil to maintain a pH of 6.0-7.5.
- **Regular Monitoring:** Monitor the crop regularly for signs of nutrient deficiencies.

### 3) Severity
**Severity Level:** Moderate to Severe
- **Impact on Yield:** Can significantly reduce the yield if not treated promptly.
- **Plant Development:** Affects the development of leaves and curds, leading to poor market quality.

### 4) Causes
**Primary Cause:**
- **Molybdenum Deficiency:** Insufficient availability of molybdenum in the soil.

**Secondary Causes:**
- **Soil pH Imbalance:** Low soil pH (acidic soils) can reduce molybdenum availability to the plants.
- **Excessive Soil Drainage:** High rainfall or excessive irrigation can leach nutrients, including molybdenum, from the soil.

### 5) Side Effects on Consumption by Animal or Human
**Consumption Risks:**
- **Humans:** No direct toxicity reported from the consumption of whiptail-affected cauliflower, but the nutritional value may be lower.
- **Animals:** Similar to humans, there is no toxicity, but the nutritional content might be reduced.

**Important Note:**
- **Marketability:** The aesthetic and textural quality of the cauliflower may be compromised, which can affect its market value.

This tailored report should help in addressing the issue and taking corrective actions to improve the health and yield of the cauliflower crop.

*/

