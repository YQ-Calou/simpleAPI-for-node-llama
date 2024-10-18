import {Local_Llama} from "./llama.mjs";    //llama

//new Llama
let new_llama = new Local_Llama();
new_llama.initialize();

async function runChat(input_message, input_systemInstruction) {
    //generationConfig
    const generationConfig = {
        temperature: 1,
        topk: 40,
        topP: 0.95
    };

    //newSeesion
    new_llama.newSeesion({
        generationConfig
    });

    //newChat
    new_llama.newChat({
        systemInstruction: input_systemInstruction,
        history: []
    });

    let result = await new_llama.sendMessage(input_message);
    result = result.trim();
    result = result.replaceAll(/\n{2,}/g, "\n");

    //sendMessage
    return result;
}

export {runChat};