const OpenAIApi = require("openai");
const Emitter = require("events").EventEmitter;
const { USER_PROMPT, FLOW_CONTEXT } = require("../constants");
module.exports = function (RED) {
  const emitter = new Emitter();
  const conversionHistory = new Map(); // store history of conversions in the current node

  function getBaseURLByProvider(provider) {
    switch (provider) {
      case "deepseek":
        return "https://api.deepseek.com/v1";
      case "gemini":
        return "https://generativelanguage.googleapis.com/v1beta/openai/";
      case "openai":
      default:
        return "https://api.openai.com/v1";
    }
  }
  function ChatGPTModelConfigNode(n) {
    const node = this;

    RED.nodes.createNode(node, n);

    // Expose the emitter so that nodes can subscribe to the 'error' & 'connected' events
    node.emitter = emitter;
    // node.conversionHistory = conversionHistory;
    // setup the openAi API
    node.provider = n.provider || "openai";
    const baseURL = getBaseURLByProvider(node.provider);
    const configuration = {
      organization: node.credentials.orgid,
      apiKey: node.credentials.apikey,
      baseURL: baseURL,
    };
    node.openAIApi = new OpenAIApi(configuration);
    node.model = n.model;

    /**
     * @function askGPT - Ask GPT a question
     * @param {string} prompt The prompt to send to the GPT API
     * @param {object} [config] Optional config object to override the node's config
     * @param {string} [config.model] Optional model to override the node's model
     * @param {object} [config.credentials] Optional credentials to override the node's settings
     * @param {string} [config.credentials.apikey] Optional apikey to override the node's settings
     * @param {string} [config.credentials.orgid] Optional orgid to override the node's settings
     * @param {boolean} [returnMsg=true] Optional flag to inhibit the `return msg` statement at the end of the code
     * @returns
     */
    node.askGPT = async function (prompt, nodeId, config, returnMsg = true) {
      let thisOpenAIApi = node.openAIApi;
      const _model = (config ? config.model : null) || node.model;
      if (config && config.credentials) {
        const oaiConfig = {
          organization: config.credentials.orgid || node.credentials.orgid,
          apiKey: config.credentials.apikey || node.credentials.apikey,
        };
        thisOpenAIApi = new OpenAIApi(oaiConfig);
      }
      node.log("Current nodeId: " + nodeId);

      // get or initalize the history for this node
      if (!conversionHistory.has(nodeId)) {
        conversionHistory.set(nodeId, []);
      }
      const history = conversionHistory.get(nodeId);

      const systemMessage =
        `Always respond with content for a Node-RED function node, always use const or let instead of var` +
        (returnMsg
          ? ", always return msg unless told otherwise"
          : ", don't return msg unless told otherwise") +
        ", don't use require() unless asked to use an external node module" +
        ", only respond with the code and inline code comments where necessary";
      const dbgMessage =
        "\n################## GPT Request ########################\n" +
        "## GPT Request ##\n" +
        "system: " +
        systemMessage +
        "\n" +
        "prompt: " +
        prompt +
        "\n" +
        "current conversation length: \n" +
        history.length +
        "\n" +
        "#######################################################";
      node.log(dbgMessage);

      const message = [
        { role: "system", content: systemMessage },
        ...history,
        { role: "user", content: prompt },
      ];
      const response = await thisOpenAIApi.chat.completions.create({
        model: _model,
        messages: message,
      });

      let userPromptOnly = prompt;
      if (
        prompt &&
        prompt.includes(USER_PROMPT) &&
        prompt.includes(FLOW_CONTEXT)
      ) {
        const start = prompt.indexOf(USER_PROMPT) + USER_PROMPT.length;
        const end = prompt.indexOf(FLOW_CONTEXT, start);
        userPromptOnly = prompt.slice(start, end).trim();
      }
      history.push(
        // only push user prompt to history, not the full prompt
        { role: "user", content: userPromptOnly },
        { role: "assistant", content: response.choices[0].message.content }
      );
      node.on("close", async function (done) {
        conversionHistory.delete(nodeId);
        node.openAIApi = null;
        done();
      });

      return response;
    };
  }
  RED.httpAdmin.get(
    "/function-gpt/history/:id",
    RED.auth.needsPermission("function-gpt.read"),
    function (req, res) {
      // console.log("get history", req.params.id);
      const nodeId = req.params.id;
      if (conversionHistory && conversionHistory.has(nodeId)) {
        res.json(conversionHistory.get(nodeId));
      } else {
        res.json([]);
      }
    }
  );
  RED.nodes.registerType("chatgpt-config", ChatGPTModelConfigNode, {
    credentials: {
      apikey: { type: "text" },
      orgid: { type: "text" },
    },
  });
};
