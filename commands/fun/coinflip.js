const coin = require('../../database');

module.exports = {
  name: 'coinflip',
  description: 'Flip a coin and get "heads" or "tails"',
  aliases: ['cf'],
  run: async (client, message, args) => {
    const user_coin = (await coin.get(message.author.id)) ?? 10000;
    var bet = args[0];
    if(bet == 'all'){
      bet = 150000;
    }
    else{
      bet = args[0] ? parseInt(args[0]) : 1;
    }
    if(isNaN(bet) || bet > 150000){
      return message.reply('Invalid amount!');
    }
    if(bet > user_coin){
      return message.reply('oh, ur poor :(');
    }
    const choice = args[1] ? args[1] : 'heads';
    if(choice != 'heads' && choice != 'tails' && choice != 'h' && choice != 't'){
      return message.reply('Invalid choice!');
    }
    const text = await message.channel.send(`**${message.author.username}** bet **${bet.toLocaleString()}$** in **${choice}**, and the coin goes ......`);
    const act1 = (choice == 'h' || choice == 'heads') ? 'heads' : 'tails';
    const act2 = (act1 == 'heads') ? 'tails' : 'heads'; 
    await new Promise(resolve => setTimeout(resolve, 500));
    const result = Math.floor(Math.random() * 4) === 0 ? act1 : act2;
    await text.edit(`**${message.author.username}** bet **${bet.toLocaleString()}$** in **${choice}**, and the coin goes **${result[0]}**....`);
    await new Promise(resolve => setTimeout(resolve, 500));
    await text.edit(`**${message.author.username}** bet **${bet.toLocaleString()}$** in **${choice}**, and the coin goes **${result[0]}${result[1]}**...`);
    await new Promise(resolve => setTimeout(resolve, 500));
    await text.edit(`**${message.author.username}** bet **${bet.toLocaleString()}$** in **${choice}**, and the coin goes **${result[0]}${result[1]}${result[2]}**..`);
    await new Promise(resolve => setTimeout(resolve, 500));
    await text.edit(`**${message.author.username}** bet **${bet.toLocaleString()}$** in **${choice}**, and the coin goes **${result[0]}${result[1]}${result[2]}${result[3]}**.`);
    await new Promise(resolve => setTimeout(resolve, 500));
    await text.edit(`**${message.author.username}** bet **${bet.toLocaleString()}$** in **${choice}**, and the coin goes **${result[0]}${result[1]}${result[2]}${result[3]}${result[4]}**`);
    if(result == 'heads'){
      if(choice == 'heads' || choice == 'h'){
        const money = bet * 2;
        await coin.set(message.author.id, user_coin + bet);
        return text.edit(`**${message.author.username}** bet **${bet}$** in **${choice}**, and the coin goes **${result}**! You won **${money.toLocaleString()}$**!`)
      }
      else{
        await coin.set(message.author.id, user_coin - bet);
        return text.edit(`**${message.author.username}** bet **${bet.toLocaleString()}$** in **${choice}**, and the coin goes **${result}**, you lose... :(`)
      }
    }
    else{
      if(choice == 'tails' || choice == 't'){
        const money = bet * 2;
        await coin.set(message.author.id, user_coin + bet);
        return text.edit(`**${message.author.username}** bet **${bet.toLocaleString()}$** in **${choice}**, and the coin goes **${result}**! You won **${money.toLocaleString()}$**!`)
      }
      else{
        await coin.set(message.author.id, user_coin - bet);
        return text.edit(`**${message.author.username}** bet **${bet.toLocaleString()}$** in **${choice}**, and the coin goes **${result}**, you lose... :(`)
      }
    }
  },
};
