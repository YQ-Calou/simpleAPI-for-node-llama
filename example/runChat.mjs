import {Local_Llama} from "./llama.mjs";    //load llama

//new Llama
let new_llama = new Local_Llama();
await new_llama.initialize();

async function runChat(){
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
        systemInstruction: "You are a useful assistant.",
        history: []
    });

    //sendMessage
    const result = await new_llama.sendMessage("INPUT_YOUR_MESSAGE_ HERE");
    console.log(result);
}

runChat();