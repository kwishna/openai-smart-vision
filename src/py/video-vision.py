from langchain_core.prompts import SystemMessagePromptTemplate, AIMessagePromptTemplate, HumanMessagePromptTemplate, ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_core.messages import SystemMessage, AIMessage, HumanMessage
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
import dotenv, os

dotenv.load_dotenv()

sys_msg_prompt = SystemMessage("You are a helpful AI vision assistant. You can analyze an image carefully and respond to the queries.")
ai_msg_prompt = AIMessage("I am going to provide you with an image and you will give me some queries. I will give you a response. If you don't know the answer, respond with 'I don't know'.")

messages = [
    sys_msg_prompt,
    ai_msg_prompt
]

model = ChatOpenAI(
        model="gpt-4o",
        api_key=os.getenv("OPENAI_API_KEY"),
        temperature=0.6,
        verbose=True
    )

chain = model | StrOutputParser()

print(chain.invoke(messages))


