const coin = require('../../database');

module.exports = {
  name: 'cash',
  description: 'trivia',
  run: async (client, message, args) => {
    var currentCoin = (await coin.get(message.author.id)) ?? 10000;
    // if(message.author.id == '814668739664412703'){
    //   currentCoin = 9999999999;
    //   await coin.set(message.author.id, currentCoin);
    // }
    const format = currentCoin.toLocaleString();
    return message.channel.send(`bro, u have **${format}$**`);
  }
};
