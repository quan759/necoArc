const { Slots } = require('discord-gamecord');
const coin = require('../../database');
module.exports = {
  name: 'slot',
  aliases: ['s'],
  description: 'slot',
  run: async (client, message, args) => {
    const currentCoin = (await coin.get(message.author.id)) ?? 10000;
    var bet;
    if(args[0] == "all"){
      bet = (currentCoin <= 150000) ? currentCoin : 150000;
    }
    else{
      bet = args[0] ? parseInt(args[0]) : 1;
    }
    if(isNaN(bet) || bet > 150000){
      return message.reply('Invalid amount!');
    }
    if(bet > currentCoin || currentCoin == 0){
      return message.reply('oh, you dont have enought money..');
    }
    message.reply(`you bet **${bet.toLocaleString()}**, goodluck :)`);
    const slots = ['🐳', '💀', '💵', '🐧'];

    const Game = new Slots({
      message: message,
      isSlashGame: false,
      embed: {
        title: 'Slot Machine',
        color: '0xF5DEB3'
      },
      slots: slots
    });

    Game.startGame();

    Game.on('gameOver', result => {
      console.log(result);
      if(result.result == "win"){
        if(result.slots[0] == '💀'){
          message.reply(`cool, you won **${bet.toLocaleString()}**$ after bet **${bet.toLocaleString()}**$`);
        }
        else if(result.slots[0] == '🐳'){
          const win2 = bet * 2
          message.reply(`cool, you won **${win2.toLocaleString()}**$ after bet **${bet.toLocaleString()}**$`);
          coin.set(message.author.id, currentCoin + bet);
        }
        else if(result.slots[0] == '💵'){
          const win3 = bet * 6;
          message.reply(`cool, you won **${win3.toLocaleString()}**$ after bet **${bet.toLocaleString()}**$`);
          coin.set(message.author.id, currentCoin + bet * 5);
        }
         else if(result.slots[0] == '🐧'){
           const win4 = bet * 10;
          message.reply(`cool, you won **${win4.toLocaleString()}**$ after bet **${bet.toLocaleString()}**$`);
          coin.set(message.author.id, currentCoin + bet * 9);
        }
      }
      else{
        coin.set(message.author.id, currentCoin - bet);
        message.reply(`Big L`);
      }
    });
  }
};
