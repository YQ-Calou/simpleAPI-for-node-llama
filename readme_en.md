<div align="center"> 
    <h1>simpleAPI-for-node-llama</h1>
    <p>Call gguf using API.</p>
    <sub>It’s easier to call gguf responses in Node.js.</sub>
    <p></p>
</div>  

<div align="center">

![Language](https://badgen.net/badge/Language/Javascript/orange)
![Version](https://badgen.net/badge/Node%20Version/v20.17.0/green)
![Support](https://badgen.net/badge/icon/Windows?icon=windows&label=Support)
![Support](https://badgen.net/badge/icon/Linux?icon=terminal&label=Support)
![Support](https://badgen.net/badge/icon/MacOS?icon=apple&label=Support)

</div>

<div align="center">

[繁體中文](readme.md) | English

</div>

## Current Testing
Running speed tested with `gemma-2 Q3` on the question "As an AI, what are five benefits you can bring to this world," all using `Node.js v20.17.0`.

| | Test Platform 1 (9B model) | Test Platform 2 (9B model) | Test Platform 3 (2B model) | Test Platform 4 (2B model) |
|-----|-----|-----|-----|-----|
| Platform | Windows | Windows | Windows | Liunx(Docker)
| CPU | Intel i7-11800H | Intel i7-12700 | Intel i5-8250U | intel i5-7500 |
| Graphics Card | Nvidia RTX 3070 Laptop | Nvidia RTX 2060 Super | Nvidia MX150 | NaN|
| Video Memory | 8GB | 8GB | 2GB | NaN |
| RAM | 64GB DDR4 Laptop | 64GB DDR4 | 16GB DDR4 Laptop | 16GB DDR4 |
| Speed (CUDA) | 4.310s | 5.464s | 41.253s | NaN |
| Speed (Vulkan) | 11.143s | 13.893s | 207.742s | NaN |
| Speed (CPU) | 89.468s | 80.125s | 70.111s | 34.079s |
| Speed (Metal) | NaN | NaN | NaN | NaN |

Let's forget about the Vulkan performance of the MX150...

## Operating Environment
**Required Installations**
- [Git (Windows)](https://git-scm.com/)
- [Node.js (All Platform)](https://nodejs.org/en)

**Optional Installations**
- [CUDA Toolkit (if you have nvdia GPU)](https://developer.nvidia.com/cuda-toolkit)

## Basic Debugging
Model storage is in the folder `models/`

System prompt is located at `prompt/systemPrompt.txt`

Please adjust `local.json`

Details are as follows:
| Name | Details |
|-----|-----|
| cpu_usage | Percentage of CPU available |
| gpu_mode | GPU mode ( "vulkan" \| "cuda" \| "metal" \| false ) |
| gpu_layer | Number of GPU layers (smaller values use less VRAM but increase CPU load) |
| use_model | Model being used |
| web_port | Network interface port (not yet available) |

## Example Usage
### Windows
```bat
./start.bat
```

### Linux
```shell
chmod 777 ./start.sh
./start.sh
```

Done!

## Example Code Usage
```js
import {Local_Llama} from "./llama.mjs";    // Load llama

// New Llama
let new_llama = new Local_Llama();
await new_llama.initialize();

async function runChat(){
    // Generation configuration
    const generationConfig = {
        temperature: 1,
        topk: 40,
        topP: 0.95
    };

    // New session
    new_llama.newSession({
        generationConfig
    });

    // New chat
    new_llama.newChat({
        systemInstruction: "You are a useful assistant.",
        history: []
    });

    // Send message
    const result = await new_llama.sendMessage("INPUT_YOUR_MESSAGE_HERE");
    console.log(result);
}

runChat();
```

## About MacOS
I don’t have an environment. If someone is willing to help with testing, please contact me!

Discord: caloutw

## Usage Projects
Below are the projects used, huge thanks for the contributions:
- [Node-llama-cpp](https://github.com/withcatai/node-llama-cpp)
- [Node-llama_webgui](https://github.com/YQ-Haroiii/node-llama_webgui)
