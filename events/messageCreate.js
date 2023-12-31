const Keyv = require('keyv');
const db = require('../database');
const { Collection } = require('discord.js');
module.exports = async (client, message) => {
    if (message.author.bot) return;
    const serverData = await db.get(message.guildId) || { prefix: 'nco' };
    const prefixes = ['#', serverData.prefix];
    const prefix = prefixes.find(p => message.content.startsWith(p));

    if (!prefix) return;
    const args = message.content.slice(prefix.length).trim().split(' ');
    const cmd = args.shift().toLowerCase();
    const command = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
    if (command) {
        if (!client.cooldowns.has(command.name)) client.cooldowns.set(command.name, new Collection());
        const now = Date.now();
        const timestamps = client.cooldowns.get(command.name);
        const cooldownAmount = (command.cooldown || 3) * 1000;
        if (timestamps.has(message.author.id)) {
            const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

            if (now < expirationTime) {
                const timeLeft = (expirationTime - now) / 1000;
                return message.reply(`Please wait ${timeLeft.toFixed(1)} second(s) to use this command!`);
            }
        }
        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
        command.run(client, message, args, serverData);
    }
}