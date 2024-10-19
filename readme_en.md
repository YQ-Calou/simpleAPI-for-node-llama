<div align="center"> 
    <h1>simpleAPI-for-node-llama</h1>
    <p>Call gguf using API</p>
    <sub>Call gguf response more easily in nodejs.</sub>
    <p></p>
</div>  

<div align="center">

![Language](https://badgen.net/badge/Language/Javascript/orange)
![Version](https://badgen.net/badge/Node%20Version/v20.17.0/green)
![Support](https://badgen.net/badge/icon/Windows?icon=windows&label=Support)
![Support](https://badgen.net/badge/icon/Liunx?icon=terminal&label=Support)
![Support](https://badgen.net/badge/icon/MacOS?icon=apple&label=Support)

</div>

<div align="center">

[Traditional Chinese](readme.md) | English

</div>

## Current Test
The running speed is tested by ``gemma-2 Q3`` inferring "Five benefits that AI can bring to the world". All tests use ``Nodejs v20.17.0``.

| | Test Platform 1 (9B) | Test Platform 2 (9B) | Test Platform 3 (2B) | Test Platform 4 (2B) | Test Platform 5 (2B) |
|-----|-----|-----|-----|-----|-----|
| Platform | Windows | Windows | Windows | Liunx | MacOS |
| CPU | intel i7-11800H | intel i7-12700 | intel i5-8250u | intel i5-7500 | Apple M3 Max |
| GPU | RTX 3070 Laptop | RTX 2060 Super | MX150 | NaN | M3 30 Core GPU |
| VRAM | 8GB | 8GB | 2GB | NaN | 32GB(UMA) |
| RAM | 64GB DDR4 Laptop | 64GB DDR4 | 16GB DDR4 Laptop | 16GB DDR4 | 32GB LPDDR4X |
| Speed(CUDA) | 4.310s | 5.464s | 41.253s | NaN | NaN |
| Speed(Vulkan) | 11.143s | 13.893s | 207.742s | NaN | NaN |
| Speed(CPU) | 89.468s | 80.125s | 70.111s | 34.079s | 3.190s |
| Speed(Metal) | NaN | NaN | NaN | NaN | 2.172s |

Forget about MX150's vulkan...

## Running Environment
Required Installation
- [Git (Windows)](https://git-scm.com/)
- [Node.js (Required for all platforms)](https://nodejs.org/en)

Optional Installation
- [CUDA Toolkit (If you have an Nvdia graphics card)](https://developer.nvidia.com/cuda-toolkit)
- [Vulkan SDK (Windows)](https://sdk.lunarg.com/sdk/download/latest/windows/vulkan-sdk.exe)


## Basic Debugging
The model is located in the ``models/`` folder

The system prompt is ``prompt/systemPrompt.txt``

Please adjust ``local.json``

Details are as follows
| Name | Details |
|-----|-----|
| cpu_usage | CPU usage percentage |
| gpu_mode | GPU mode ( "vulkan" \| "cuda" \| "metal" \| false ) |
| gpu_layer | GPU layers (The smaller the value, the less Vram usage, the greater the CPU load) |
| use_model | Model used |
| web_port | Web interface Port (Not ready) |

## Example Usage
### Windows
```bat
./start.bat
```

### Liunx
```shell
chmod 777 ./start.sh
./start.sh
```

Done!

## Usage Example
```js
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
```

## Contributors
The following are project contributors. Many thanks for their testing contributions.
- [GuaZi (MacOS & 3090ti tester)](https://github.com/guazixd)
- [Necostw (i7-12700 tester)](https://github.com/necostw)

## Used Projects
The following projects are used. Many thanks for their contributions.
- [Node-llama-cpp](https://github.com/withcatai/node-llama-cpp)
- [Node-llama_webgui](https://github.com/YQ-Haroiii/node-llama_webgui)
