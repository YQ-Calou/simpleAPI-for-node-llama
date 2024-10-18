import { getLlama, LlamaChatSession, Llama3ChatWrapper } from "node-llama-cpp"; //node-llama-cpp
import * as path from "path" //path
import * as os from "os" //os
import * as fs from "fs" //fs
import { createRequire } from 'module'; //require

const require = createRequire(import.meta.url);   //require setting

const local = require("./local.json");  //local config
const model_dir = path.join(import.meta.dirname, "models", local.use_model);   //models dir

if(!fs.existsSync(model_dir)){
    throw new Error("No Found model."); //not found.
}

const cpuCount = os.cpus().length;  //CPU core count

//llama cpp
const llama = await getLlama({
    gpu: local.gpu_mode,
    maxThreads: cpuCount * (local.cpu_usage / 100),
});

//load model
let model = await llama.loadModel({
    modelPath: model_dir,
    gpuLayers: local.gpu_layer
});

//console.log("GPU type:", llama.gpu);

export class Local_Llama{
    constructor(){
        this.context = null,
        this.session = null,
        this.history = [],
        this.history_llama_format = "",
        this.systemInstruction = null,
        this.generationConfig = {temperature:1,topk:40,topP:0.95}
    }

    async initialize(){
        //create context
        this.context = await model.createContext();
        this.session = new LlamaChatSession({
            contextSequence: this.context.getSequence(),
        });
    }

    newSeesion({generationConfig}){
        if(!this.context || !this.session)
            throw new Error("llama is not initialization, use .initialize() function initialization llama.");

        if(!generationConfig)
            this.generationConfig = {temperature:1,topk:40,topP:0.95};

        this.generationConfig = generationConfig;
    }

    newChat({systemInstruction, history}){
        //if no setting context or session, throw error
        if(!this.context || !this.session)
            throw new Error("llama is not initialization, use .initialize() function initialization llama.");

        //check history format
        this.#check_history(history);

        //defult
        if(!systemInstruction)
            this.systemInstruction = "";
        else
            this.systemInstruction = systemInstruction;

        //defult
        if(history != undefined && history?.length > 0)
            this.history = history;

        //convert history to llama usage
        this.#convert_history();
    }

    async sendMessage(message){
        //if no setting context or session, throw error
        if(!this.context || !this.session || !this.history_llama_format || !this.generationConfig)
            throw Error("llama is not config complete, use .newSeesion() or .newChat() function config llama.");

        //gen random seed
        const rnd_seed = () => {
            const max = Number.MAX_SAFE_INTEGER;
            return Math.floor(Math.random() * max);
        }
        
        //new generationConfig
        let new_generationConfig = this.generationConfig;
        new_generationConfig.seed = rnd_seed();

        //create now prompt
        const user_header = "### User\n";
        const assistant_header = "### Assistant\n";
        let new_message = `${this.history_llama_format}${user_header}${message}\n\n${assistant_header}`;

        //send message
        const reply = await this.session.prompt(new_message, new_generationConfig);

        //add history
        this.history.push({
            role: "user",
            text: message
        });
        this.history.push({
            role: "model",
            text: [reply]
        });

        //convert history to llama usage
        this.#convert_history();

        return reply;
    }

    #check_history(history){
        //set role
        const role_type = ["user", "model"];

        let error_message = null;

        //check length
        if(history.length % 2 != 0){
            throw new Error(`history data structure got error.`);
        }

        for(let i = 0;i<history.length;i++){
            if(history[i].role != role_type[i % 2])
                throw new Error(`role setting on history[${i}] got error. role type must be ${role_type[i % 2]}`);

            if(history[i].text == undefined)
                throw new Error(`history data format got error.`);

            if(i % 2 == 1 && !Array.isArray(history[i].text))
                throw new Error(`history data format got error.`);

            if(i % 2 == 1 && !history[i].text.length != 1)
                throw new Error(`history data format got error.`);

            if(i % 2 == 1 && (typeof history[i].text[0]) != "string")
                throw new Error(`history data format got error.`);
        }

        return true;
    }

    //convert history to llama usage
    #convert_history(){
        this.history_llama_format = "";

        //set header
        const header = {
            system : `### System`,
            user : `### User`,
            model : `### Assistant`
        };

        //set system instruction
        if(this.systemInstruction)
            this.history_llama_format += `${header.system}\n${this.systemInstruction}\n\n`;

        //set history
        for(let i = 0; i < this.history.length; i++){
            switch(this.history[i].role){
                case "user":
                    this.history_llama_format += `${header.user}\n${this.history[i].text}\n\n`;
                    break;
                case "model":
                    this.history_llama_format += `${header.model}\n${this.history[i].text[0]}\n\n`;
                    break;
                default:
                    throw new Error(`history data format got error.`);
            }
        }

        //return promise
        return true;
    }
}