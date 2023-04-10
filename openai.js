import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function callChatGPT(prompt,message){

    const system_prompt = {"role": "system", "content": prompt};
    const user_prompt = {"role": "user", "content": message};

    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [system_prompt, user_prompt],
        temperature: 1,
        presence_penalty: 0,
        frequency_penalty: 0,
        top_p: 1,
    });
    return completion.data.choices[0].message.content
}