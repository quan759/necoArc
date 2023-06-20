const axios = require('axios');
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  organization: process.env.OPENAI_ORG,
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const check = {};

module.exports = {
  name: 'ask',
  description: 'Chat with the bot using OpenAI',
  run: async (client, message, interaction) => {
    message.channel.sendTyping();
    if (check[message.channel.id] == undefined) {
      check[message.channel.id] = 1;
      message.channel.send('bot đã có phiên bản AI xịn hơn, dùng nó bằng cách ping bot hoặc ghi ChatCompletion nhé, lưu ý là khi dùng lệnh này, nếu muốn nhắn tin bình thường thì nên thêm // vào trước tin nhắn :)');
    }
    const question = message.content;
    try {
      const response = await axios({
        method: 'post',
        url: 'https://api.openai.com/v1/engines/text-davinci-003/completions',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        data: {
          prompt: `Hey Give me a response for this : ${(question)}.`,
          temperature: 0.00000001,
          max_tokens: 1000,
          top_p: 1.0,
          frequency_penalty: 0.5,
          presence_penalty: 0.0,
        },
      });
      const embed = {
        color: 0xF5DEB3,
        title: 'Bot Response',
        author: {
          name: 'Neco arc',
          url: 'https://discord.js.org',
        },
        description: `\`\`\`${response.data.choices[0].text}\`\`\``,
        timestamp: new Date(),
        footer: {
          text: 'Chat with a cat',
          icon_url: 'https://i.imgur.com/L0sBgsi.png',
        },
      };
      message.channel.send({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      message.channel.send('Bot hiện đang gặp sự cố, vui lòng thử lại sau.');
    }
  },
};