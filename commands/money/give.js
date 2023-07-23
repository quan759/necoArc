const coin = require('../../database');

module.exports = {
  name: 'give',
  description: 'give',
  run: async (client, message, args) => {
    const user1_coin = await coin.get(message.author.id);
    if (args.length !== 2) {
      return message.reply('Please provide user and amount!');
    }
    const user = message.mentions.members.first();
    const user2_coin = (await coin.get(user.id)) ?? 10000;
    const amount = parseInt(args[1]);
    if (isNaN(amount) || amount > user1_coin) {
      return message.reply('oh, ur poor :(');
    }
    await coin.set(message.author.id, user1_coin - amount);
    await coin.set(user.id, user2_coin + amount);
    console.log(user2_coin + amount, user1_coin - amount);
    return message.reply('Success!');
  }
};
