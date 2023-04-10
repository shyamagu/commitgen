import axios from 'axios';

export async function callAzureChatGPT(prompt,message) {

    const system_prompt = {"role": "system", "content": prompt};
    const user_prompt = {"role": "user", "content": message};

    const response = await axios.post(process.env.AOAI_ENDPOINT+"/openai/deployments/"+process.env.AOAI_MODEL+"/chat/completions?api-version=2023-03-15-preview", 
        {"messages":[system_prompt, user_prompt],
        "max_tokens": 800,
        "temperature": 1.0,
        "frequency_penalty": 0,
        "presence_penalty": 0,
        "top_p": 1.0},
        {headers: {
        'Content-Type': 'application/json',
        'api-key': process.env.AOAI_API_KEY
        }
      });

    return response.data.choices[0].message.content
}
