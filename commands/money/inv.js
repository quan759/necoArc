const coin = require('../../database');
const { Fishy } = require('discord-gamecord');

module.exports = {
  name: 'inventory',
  description: 'fishing',
  aliases: ['inv'],
  run: async (client, message, args) => {
    const cash = await coin.get(message.author.id);
    console.log(cash);
    const Game = new Fishy(
      {
        message: message,
        isSlashGame: false,
        player: message.author,
        balance: cash,
        embed: {
          title: 'Fishy Inventory',
          color: '0xF5DEB3',
        },
        fishes: {
          junk: { emoji: '🔧', price: 5 },
          common: { emoji: '🐟', price: 10 },
          uncommon: { emoji: '🐠', price: 20 },
          rare: { emoji: '🐳', price: 50 }
        },
        fishyRodPrice: 1000,
        catchMessage: 'You caught a {fish}. You paid **{amount}** for the fishing rod.',
        sellMessage: 'You sold **{amount}**x {emoji} {type} items for a total of {price}.',
        noBalanceMessage: 'You don\'t have enough balance to rent a fishing rod.',
        invalidTypeMessage: 'Fish type can only be junk, common, uncommon or rare.',
        invalidAmountMessage: 'Amount must be between 0 and fish max amount.',
        noItemMessage: 'You don\'t have any of this item in your inventory.',
      },
    );

    Game.fishyInventory();
  },
};
