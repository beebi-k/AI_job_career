import openai
from ..config import OPENAI_API_KEY

openai.api_key = OPENAI_API_KEY

def ask_chatbot(question: str) -> str:
    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[{"role": "user", "content": question}],
        temperature=0.8
    )
    return response['choices'][0]['message']['content']
