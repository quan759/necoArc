module.exports = {
    name: 'kick',
    description: 'Kick anyone out of server',
    options: [
        {
            name: 'user',
            description: 'user that you want to kick',
            type: 'USER',
            required: true,
        },
        {
            name: 'reason',
            description: 'reason',
            type: 'STRING',
            require: false,
        }
    ],
    run: async (client, interaction) => {
        if (!interaction.member.permissions.has('KICK_MEMBERS')) return interaction.reply('You do not have permission');
        const user = interaction.options.getUser('user');
        if (user.id === interaction.user.id) return interaction.reply('You can not kick yourself');
        const reason = interaction.options.getString('reason');
        try {
            interaction.guild.members.kick(user.id, reason);
            interaction.reply('Sucess!');
        } catch (err) {
            interaction.reply('Error');
            console.error(err);
        }
    },
};