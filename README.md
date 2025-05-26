# Node-RED Function Node with integrated ChatGPT With Memory, Multi-turn Conversations Support

The Code based on [@flowfuse/node-red-function-gpt](https://github.com/FlowFuse/node-red-function-gpt),Thanks for their contribution

A Node-RED node that adds an "Ask ChatGPT(With Memory)" input and button to a duplicate of the built-in function node.
![picture 1](images/b773216cb9e92964b9b64d1c1bb081bef3ff972ebe7bc91242f48b295087b966.png)

## Installation

To add the node to your own instance of Node-RED:

1. Open the "Menu" inside Node-RED
1. Click "Manage palette"
1. Select the "Install" tab
1. Search "chatgpt"
1. Install the `node-red-function-gpt-with-memory` node

You will need a [valid API Key from OpenAI](https://platform.openai.com/account/api-keys)

## How to Use

### Basic Example

![picture 1](images/b773216cb9e92964b9b64d1c1bb081bef3ff972ebe7bc91242f48b295087b966.png)

1. Add the Function GPT nodes to your editor
2. Configure your ChatGPT credentials
3. Deploy your nodes
4. Open the function-gpt node
5. Type your prompt into the text input at the bottom of the editor panel and click "Ask ChatGPT(With Memory)".

## New Features

Contributed by [Zhou Xingyu](https://github.com/strutter0816)

### Add Memory

The node now includes several enhanced features:

1. **Memory Management**: The node maintains conversation history for each instance
2. **Multi-turn Conversations**: Support for multi-turn conversations with ChatGPT, enabling more complex and contextual interactions.
3. **Improved User Experience**: After asking a question, the input field is automatically cleared for a smoother workflow.

Basic example for memory

![picture 2](images/54aa94dbff141e678cd5802091e484c32add4cbf1abc75c317765d365c630996.png)
GPT can remember what I said before  
![picture 3](images/c34b043274e9aee3faf8b9d674e822c516321ddfaf01b3f3408e68ed05fa4b50.png)

### Support More LLMs (DeepSeek and Gemini) (Default: OpenAI)

You can select your preferred LLM provider, enter your API key, and choose a specific LLM model as needed.
![picture 8](images/6bf62f538590289e401b8e8865854973e2244b025e66936d1541af86c15681b2.png)

### Show Conversation History

You can view the complete conversation history between the user and the LLM in a dedicated tab. This helps you track previous prompts and responses for better context and debugging.

![picture 9](images/e3c59e3a5ad11a79843844ec058dd5dd7380f766ecbc2c8439c448b1b8c8d729.png)

### Add flow context for the node

The node can automatically access and include the current flow context in each LLM request. This allows you to provide additional contextual information from your Node-RED flow, enabling more dynamic and intelligent responses.

![picture 10](images/3598a99dacfc79005d4ed6eb62784b65a3ea33a756661d8246c183b681f8e4ee.png)

![picture 11](images/e4fb897f365e0a3e68ca4e91df3c59e87fa7ddf51a8f9acebb6c9098eba87ac6.png)

### Inline Prompts

If you want to inject code into already written content, you can write an inline prompt. These prompts are written as comments, e.g.:

```js
//$PROMPT: Double the input
```

If you've configured Node-RED to use the "Monaco" editor, this will then show an "Ask ChatGPT(With Memory)" hyperlink above the inserted comment, that you can click to ask this to ChatGPT.

![picture 5](images/97ee2535954da7614cbec359e82fc209340836204e04552e0c69c82526b62f6d.png)

You can have as many of these within the function node as you like.

## Troubleshooting

After adding the node to the palette, you do currently need
to "Deploy", before you can use the integrated ChatGPT prompt.

## Copyright

This code is derived from the [core Node-RED Function node](https://github.com/node-red/node-red/blob/master/packages/node_modules/%40node-red/nodes/core/function/10-function.js) that is copyright OpenJS Foundation and licensed under the Apache License, Version 2.0
