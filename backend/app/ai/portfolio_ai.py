import openai
from ..config import OPENAI_API_KEY

openai.api_key = OPENAI_API_KEY

def generate_portfolio(user_input: str) -> str:
    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[{"role": "user", "content": f"Generate professional portfolio: {user_input}"}],
        temperature=0.7
    )
    return response['choices'][0]['message']['content']
