const coin = require('../../database');
const { Fishy } = require('discord-gamecord');

module.exports = {
    name: 'sell',
    description: 'fishing',
    run: async (client, message, args) => {
      const fishType = args[0] ? args[0].toLowerCase() : 'uncommon';
      const amount = args[1] ? args[1] : 1;
      
      const cash = await coin.get(message.author.id);
        const Game = new Fishy({
            message: message,
            isSlashGame: false,
            player: message.author,
            balance: cash,
            embed: {
                title: 'Fishy Inventory',
                color: '0xF5DEB3'
            },
            fishes: {
                junk: { emoji: '🔧', price: 500 },
                common: { emoji: '🐟', price: 1000 },
                uncommon: { emoji: '🐠', price: 2000 },
                rare: { emoji: '🐳', price: 5000 }
            },
            fishyRodPrice: 1000,
            catchMessage: 'You caught a {fish}. You paid {amount} for the fishing rod.',
            sellMessage: `You sold **{amount}**x {type} items for a total of **{price}$**.`,
            noBalanceMessage: 'You don\'t have enough balance to rent a fishing rod.',
            invalidTypeMessage: 'Fish type can only be junk, common, uncommon or rare.',
            invalidAmountMessage: 'Amount must be between 0 and fish max amount.',
            noItemMessage: 'You don\'t have any of this item in your inventory.'
        });
      Game.sellFish(fishType, amount);
      Game.on('sellFish', fishy => { player = fishy.player });
    }
};
