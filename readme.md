<div align="center"> 
    <h1>simpleAPI-for-node-llama</h1>
    <p>利用API的方式調用gguf</p>
    <sub>更簡單的在nodejs中調用gguf回應。</sub>
    <p></p>
</div>  

<div align="center">

![Language](https://badgen.net/badge/語言/Javascript/orange)
![Version](https://badgen.net/badge/Node版本/v20.17.0/green)
![Support](https://badgen.net/badge/icon/Windows?icon=windows&label=支援)
![Support](https://badgen.net/badge/icon/Liunx?icon=terminal&label=支援)
![Support](https://badgen.net/badge/icon/Turmux?icon=terminal&label=支援)
![Support](https://badgen.net/badge/icon/MacOS?icon=apple&label=支援)

</div>

<div align="center">

繁體中文 | [English](readme_en.md)

</div>

## 目前測試
運行速度由 ``gemma-2 Q3`` 推理「身為人工智慧，你能為這世界帶來的五個好處」測試，全部採用 ``Nodejs v20.17.0``。

| | 平台1 (9B) | 平台2 (9B) | 平台3 (2B) | 平台4 (2B) | 平台5 (2B) |
|-----|-----|-----|-----|-----|-----|
| 平台 | Windows | Windows | Windows | Liunx(Docker) | MacOS |
| CPU | intel i7-11800H | intel i7-12700 | intel i5-8250u | intel i5-7500 | Apple M3 Max |
| 顯示卡 | RTX 3070 Laptop | RTX 2060 Super | MX150 |  | M3 30 Core GPU |
| 顯存 | 8GB | 8GB | 2GB |  | 32GB(UMA) |
| 記憶體 | 64GB | 64GB | 16GB | 16GB | 32GB |
| 速度(CUDA) | 4.310s | 5.464s | 41.253s | No Support | No Support |
| 速度(Vulkan) | 11.143s | 13.893s | 207.742s | No Support | No Support |
| 速度(CPU) | 89.468s | 80.125s | 70.111s | 34.079s | 3.190s |
| 速度(Metal) | No Support | No Support | No Support | No Support | 2.172s |

| | 平台6 (2B) |
|-----|-----|
| 平台 | Turmux(Android) |
| CPU | 天璣 7200 Ultra |
| 顯示卡 |  |
| 顯存 |  |
| 記憶體 | 16GB |
| 速度(CUDA) | No Support |
| 速度(Vulkan) | No Support |
| 速度(CPU) | 132.496s |
| 速度(Metal) | No Support |

MX150 的 vulkan 就算了吧...

## 運行環境
必要安裝
- [Git (Windwos)](https://git-scm.com/)
- [Node.js (所有平台必須)](https://nodejs.org/en)

選擇安裝
- [CUDA Toolkit (如果你有Nvdia顯卡)](https://developer.nvidia.com/cuda-toolkit)
- [Vulkan SDK (Windows)](https://sdk.lunarg.com/sdk/download/latest/windows/vulkan-sdk.exe)

## 基礎調試
模型存放位置於資料夾 ``models/`` 下

系統提示詞為 ``prompt/systemPrompt.txt``

請調整 ``local.json``

詳細資料如下
| 名稱 | 詳細資料 |
|-----|-----|
| cpu_usage | CPU可使用的百分比 |
| gpu_mode | GPU模式 ( "vulkan" \| "cuda" \| "metal" \| false ) |
| gpu_layer | GPU層數 (越小的數值，Vram占用更少，CPU負載越大) |
| use_model | 使用的模型 |
| web_port | 網路介面Port (暫未開放) |

## 範例使用方法
### Windows
```bat
./start.bat
```

### Liunx
```shell
chmod 777 ./start.sh
./start.sh
```

### Turmux
```shell
pkg install nodejs
pkg install cmake
pkg install zip
wget https://github.com/YQ-Haroiii/simpleAPI-for-node-llama/archive/refs/tags/v1.0.zip
unzip v1.0.zip
cd <資料夾名稱(不知道的話可以用ls看一下這個目錄底下的所有資料夾進入)>
cd models
wget <gguf模型(等他下載，看檔案大小)>
cd ..
npm install cmake-js
npm install node-llama-cpp
node console_service.mjs
```

搞定!

## 使用方法範例
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

## 協助者
以下是項目協助人員，十分感謝他們的測試貢獻
- [GuaZi (MacOS & 3090ti 測試者)](https://github.com/guazixd)
- [Necostw (i7-12700 測試者)](https://github.com/necostw)

## 使用項目
以下為使用項目，非常感謝貢獻
- [Node-llama-cpp](https://github.com/withcatai/node-llama-cpp)
- [Node-llama_webgui](https://github.com/YQ-Haroiii/node-llama_webgui)
