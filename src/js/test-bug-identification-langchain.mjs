import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import dotenv from 'dotenv';
import path from 'path';

// import { AzureChatOpenAI, AzureOpenAIInput, OpenAIChatInput } from '@langchain/azure-openai';
// import { ChatPromptTemplate } from '@langchain/core/prompts';
// import process from 'node:process';
// import dotenv from 'dotenv';
// import { resolve } from 'path';
// import { ConversationChain } from 'langchain/chains';

// dotenv.config({ path: resolve('.env') });

// async function main(): Promise<void> {
// 	const azureOpenAiConfigs: Partial<OpenAIChatInput> & Partial<AzureOpenAIInput> = {
// 		azureOpenAIEndpoint: process.env.AZURE_OPENAI_API_ENDPOINT,
// 		azureOpenAIApiKey: process.env.AZURE_OPENAI_API_KEY,
// 		streaming: false,
// 		temperature: 0.7
// 	};

// 	const client: AzureChatOpenAI = new AzureChatOpenAI({
// 		...azureOpenAiConfigs,
// 		verbose: false,
// 		azureOpenAIApiDeploymentName: process.env.AZURE_OPENAI_API_DEPLOYMENT_NAME
// 	});
// }

// Load environment variables
dotenv.config({ path: path.resolve('./.env') });

// Initialize the ChatOpenAI model
const model = new ChatOpenAI({
    modelName: "gpt-4o",
    openAIApiKey: process.env.OPENAI_API_KEY,
    temperature: 0.5
});

async function main() {
    // System message
    const systemMessage = new SystemMessage({
        content: `You are an expert vision AI with Automation test engineering expertise and a good understanding of Playwright UI automation.
    You are very good at analyzing images in context of the error messages.`
    });

    // User message with instructions
    const userInstructions = new HumanMessage({
        content: `**Objective:**
Your task is to analyze an image and an error message provided when a Playwright UI automation test fails. You should identify the reason for the failure and explain it in plain, simple English so that even a non-technical person can easily understand. Your response should be concise and well-crafted, avoiding long, boring paragraphs.

**Tree of Thoughts Technique:**
1. **Understanding the Context:**
   - **Identify:** Carefully examine the provided image and error message.
   - **Analyze:** Determine the specific UI element or interaction that caused the failure.
   - **Rationale:** Understanding the context helps in pinpointing the exact issue, ensuring a clear and accurate explanation.

2. **Identifying the Reason for Failure:**
   - **Identify:** Look for common issues such as element not found, timeout errors, or visual discrepancies.
   - **Analyze:** Compare the expected UI state with the actual state shown in the image.
   - **Rationale:** Identifying the root cause ensures that the explanation addresses the core issue, making it easier for non-technical stakeholders to understand.

3. **Crafting a Simple Explanation:**
   - **Identify:** Determine the key points that need to be communicated.
   - **Analyze:** Break down the technical details into simple, everyday language.
   - **Rationale:** A well-crafted explanation ensures that the information is accessible and easily understood by non-technical individuals.

**ReAct (Review, Action) Strategy:**
- **Review:** Summarize the identified issue and the reason for the failure. Highlight the key points that need to be communicated.
- **Action:** Develop a step-by-step plan for crafting the explanation, ensuring each step is clear and directly tied to making the information accessible.

**Final Validation:**
- **Define:** Propose methods for validating the effectiveness of the explanation. This could include having a non-technical person review the explanation to ensure clarity.
- **Consider:** Use edge cases or similar scenarios to test the robustness of the explanation.
- **Measure:** Success is measured by the ease with which a non-technical person can understand the reason for the failure.

**Example Structure for Explanation:**
1. **Issue Identification:** Clearly state the specific issue that caused the failure.
2. **Simple Explanation:** Explain the issue in plain, simple English for a non-technical person.
3. **Conclusion:** Summarize the explanation and, if possible, suggest a next step or solution.

**Example Explanation:**
"Hi there! It looks like the test failed because the click action on 'Login' button failed, because it wasn't interactable at the moment.
This is because the 'Login' button was hidden behind error message dialog box.
To fix this, we might need to check if there is no other web-element interpect the click action on the 'Login' button.
The error message dialog box says, "Error: Close the VPN before login". You should disable the VPN and try again. Thanks!"`
    });

    // User message with error and image
    const userMessage = new HumanMessage({
        content: [
            {
                type: "text",
                text: "Error: locator.click: Timeout 30000ms exceeded.",
            },
            // {
            //     type: "image_url",
            //     image_url: {
            //         "url": get_image_base64(resolve("./images/baby-picture.png"))
            //     },
            // },
            {
                type: "image_url",
                image_url: {
                    "url":
                        "https://i0.wp.com/www.smarttutorials.net/wp-content/uploads/2014/11/Session-timeout-warning-popup-with-countdown-using-jquery-and-php.png",
                    // "url": `data:image/jpeg;base64,${base64_image}`
                    detail: "auto"
                }
            },
        ],
    });

    // Call the model with the messages
    const response = await model.invoke([systemMessage, userInstructions, userMessage]);

    // Log the response
    console.log(response.content);
}

main().catch(error => console.error(error));