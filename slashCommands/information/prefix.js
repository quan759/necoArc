const db = require('../../database');
module.exports = {
    name: 'prefix',
    description: 'Xem/Lấy prefix',
    type: 'CHAT_INPUT',
    options: [
        {
            name: 'prefix',
            description: 'Prefix you want to change to',
            type: 'STRING',
            required: false,
        }
    ],
    run: async (client, interaction, serverData) => {
        const prefixSet = interaction.options.getString('prefix');
        if (!prefixSet) return interaction.reply(`Server's current prefix: ${serverData.prefix}`);
        await db.set(interaction.guildId, { prefix: prefixSet.toLowerCase() });
        interaction.reply('Sucess! ✅');
    },
};