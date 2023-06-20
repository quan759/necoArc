const { Client, Intents, Collection } = require('discord.js');
const { Configuration, OpenAIApi } = require("openai");
const axios = require('axios');
const keepAlive = require("./server")
const Database = require("@replit/database");
const db = require('./database');
const dg = new Database();
const list = new Database();

require('dotenv').config()

const deletedMsg = require('./globalVar');
const chatConversation = {};
const userMap = {};

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES
  ]
});

const deletedMessages = new Collection();

client.commands = new Collection();
client.aliases = new Collection();
client.categories = new Collection();
client.interactions = new Collection();
client.cooldowns = new Collection();

['command', 'event', 'slashCommand'].forEach(handler => require(`./handlers/${handler}`)(client));

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

client.on('messageDelete', function (message) {
  if (!message.author.bot) {
    if (!deletedMsg[message.channel.id]) {
      deletedMsg[message.channel.id] = [];
    }

    const deletedMessages = deletedMsg[message.channel.id];
    deletedMessages.unshift(message);

    if (deletedMessages.length > 10) {
      deletedMessages.pop();
    }
  }
});

let activeChannel = null, check = 0, flag = 0;

client.on('messageCreate', async function (message) {
  if(message.author.bot) return;
  if(message.content == 'id' & message.author.id == '814668739664412703'){
    console.log(message.channel.id);
    message.channel.send(message.channel.id);
  }

  if (message.content.startsWith('hi') || message.content.startsWith('hello') || message.content.startsWith('chào') || message.content.startsWith('hj')) {
    message.channel.send("<:t_:1054249182510207026> ✌️");
    return;
  }
  if (message.content.toLowerCase() == ('bot ngoan') || message.content.toLowerCase() == ('bot hay')) {
    message.reply("https://media.discordapp.net/attachments/951661841636032542/1084494966815981588/FB_IMG_1678624705351.png");
  }
  if (message.content.toLowerCase() == ('bot ngu') || message.content.toLowerCase() == ('bot đần')) {
    message.reply("https://media.discordapp.net/attachments/951661841636032542/1084495064484556830/FB_IMG_1678235402162.jpg");
  }

  if (message.content.startsWith('whitelist') & message.author.id == '814668739664412703') {
    const user = message.mentions.members.first();
    await list.set(user.id, true);
    await message.channel.send('Sucess <:emoji_40:1113073468125229166>')
  }

  if (message.content == 'check') {
    if (await list.get(message.author.id)) {
      message.channel.send('You are already whitelisted');
    }
    else {
      message.channel.send('You are black');
    }
  }

  if (message.content.toLowerCase() === 'chatcompletion') {
    const isActive = await dg.get(message.channel.id);
    if (!isActive) {
      await dg.set(message.channel.id, true);
      await message.channel.send('You have activated ChatCompletion. Please type your message.');
    }
    else {
      return message.channel.send('You have already activated Chatcompletion in this channel')
    }
    return;
  }
  if (message.content.toLowerCase() === 'stopcompletion') {
    const isActive = await dg.get(message.channel.id);
    if (!isActive) {
      return message.channel.send('This channel has not activated ChatCompletion yet, or you have not activated any channel.');
    }
    await dg.set(message.channel.id, false);
    await message.channel.send('You have stopped ChatCompletion.');
    return;
  }

  if ((await dg.get(message.channel.id) && !message.content.startsWith('//')) || (message.content.toLowerCase().includes('<@1041230301340368896>'))) {
    const userId = message.author.id;
    const now = new Date();
    const usageLimit = 10;
    const usageLimitDuration = 24 * 60 * 60 * 1000;

    const userUsageCount = userMap[userId] ? userMap[userId].usageCount : 0;
    userMap[userId] = {
      usageCount: userUsageCount + 1,
      lastUsed: now,
    };

    if (userUsageCount >= usageLimit & !list.get(message.author.id)) {
      const remainingTime = Math.round((userMap[userId].lastUsed - now + usageLimitDuration) / 1000 / 60);
      return message.reply(`You have exceeded the usage limit of ${usageLimit} times per day. Please try again in ${remainingTime} minutes.`);
    }

    let conversationLog = [{ role: 'system', content: 'You are a friendly chatbot.' }];

    try {
      await message.channel.sendTyping();

      let prevMessages = await message.channel.messages.fetch({ limit: 15 });
      prevMessages.reverse();

      prevMessages.forEach((msg) => {
        if (msg.author.id !== message.author.id) return;
        if(message.author.bot) return;

        conversationLog.push({
          role: 'user',
          content: msg.content,
        });
      });

      const result = await openai
        .createChatCompletion({
          model: 'gpt-3.5-turbo',
          messages: conversationLog,
          max_tokens: 1000,
        })
        .catch((error) => {
          console.log(`OPENAI ERR: ${error}`);
        });

      message.channel.send(result.data.choices[0].message);
    } catch (error) {
      console.error(error);
      message.reply('There was an error generating the response.');
    }
  }
  console.log(message.author.username);
  console.log(message.content);
  console.log("-----------------------");
});

keepAlive();

client.login(process.env.TOKEN);