const axios = require('axios');
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  organization: process.env.OPENAI_ORG,
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
const userMap = {};

module.exports = {
  name: 'imagine',
  description: 'Generate an image based on a prompt',
  run: async (client, message, args) => {
    if (!args.length) {
      return message.reply('Please provide a prompt for the image generation.');
    }

    // const userId = message.author.id;
    // const now = new Date();

    // if (userMap[userId] && now - userMap[userId] < 24 * 60 * 60 * 1000 && message.author.id !== '814668739664412703') {
    //   const remainingTime = Math.round((userMap[userId] - now + 24 * 60 * 60 * 1000) / 1000 / 60);
    //   return message.reply(`You can only use this command once per day. Please try again in ${remainingTime} minutes.`);
    // }


    try {
      const prompt = args.join(' ');
      const response = await openai.createImage({
        prompt,
        n: 1,
        size: "512x512",
      });

      message.channel.send(response.data.data[0].url);

      // userMap[userId] = now;
    } catch (error) {
      console.error(error);
      message.reply('There was an error generating the image.');
    }
  },
};
