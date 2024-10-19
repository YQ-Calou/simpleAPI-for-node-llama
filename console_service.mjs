import { runChat } from "./__API_Llama.mjs";
import * as readline from "readline";
import * as fs from "fs";

async function console_readline() {
    //rl
    const rl = readline.createInterface({
        input: process.stdin, output: process.stdout
    });

    rl.on("SIGINT", () => {
        rl.close();
        console.log();
        console.log(`\x1b[35mSystem: Service is shutting down.`);
        console.log("\x1b[0m");
        process.exit();
    });

    //wait for input
    let user_message = await new Promise(resolve => rl.question("\x1b[34mUser: ", (answer) => resolve(answer)));

    //close
    rl.close();

    //exit
    if(user_message == "/exit") {
        rl.close();
        console.log(`\x1b[35mSystem: Service is shutting down.`);
        console.log("\x1b[0m");
        process.exit();
    }

    //load systemPrompt
    const systemPrompt = fs.readFileSync("./prompt/systemPrompt.txt", "utf8");

    //sendMessage
    const reply = await runChat(user_message, systemPrompt);

    //print
    console.log(`\x1b[35mAssistant: ${reply}\n`);
}


async function main(){
    console.clear();
    console.log("\x1b[42mnode llama Javascript console service. v2.0.0 \x1b[0m");
    console.log("\x1b[42menter your message or type '/exit' to exit. \x1b[0m");
    do{ 
        await console_readline(); 
    }while(true);
}

main();