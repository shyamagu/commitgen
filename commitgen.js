#!/usr/bin/env node

import 'dotenv/config'
import { callAzureChatGPT } from "./openai_azure.js";
import { callChatGPT } from "./openai.js";

const system_prompt = "あなたはGit Commit コメント生成マシンです。入力されたdiff形式の差分コードに対して、72文字以内のサマリーコミットコメントを生成して下さい。可能な限り短い日本語の文章にして下さい。"

const user_prompt = process.argv[2]

if(user_prompt){

    // Azure GPT-3
    if(process.env.AOAI_API_KEY && process.env.AOAI_ENDPOINT && process.env.AOAI_MODEL){
        const reply = await callAzureChatGPT(system_prompt,user_prompt)
        console.log(reply)

    // OpenAI GPT-3
    }else if(process.env.OPENAI_API_KEY){
        const reply = await callChatGPT(system_prompt,user_prompt)
        console.log(reply)
    }else{
        console.log("キーが設定されていないためサマリが生成できませんでした")
    }
}else{
    console.log("変更はありません")
}


