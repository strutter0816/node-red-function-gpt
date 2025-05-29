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

![picture 14](images/c7ba205cfe314616f7aa3b680771ab65a180fe5f033897bef9ded15ae9180e44.png)

### Add flow.json context for the node

The node now automatically accesses and includes the current flow context in every LLM request. This enables the generation of more intelligent and context-aware responses based on real-time flow data.

![picture 12](images/1de0f1b9c8d1f47e83dd650988cf39993a7da0729087adec5e6ba242ffe0ce79.png)

**Note:** For user experience, the current flow context is not displayed in your conversation history.

![picture 13](images/01c42f0a0cd6017982bb3006fb2ba943001e277ecddab0c5f2e0c1197040f40c.png)

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
