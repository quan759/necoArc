module.exports = {
    name: 'ban',
    description: 'Ban người nào đó ra khỏi server',
    options: [
        {
            name: 'user',
            description: 'user that you want to ban',
            type: 'USER',
            required: true,
        },
        {
            name: 'reason',
            description: 'reason',
            type: 'STRING',
            require: false,
        },
        {
            name: 'days',
            description: 'how long?',
            type: 'INTEGER',
            minValue: 0,
            maxValue: 7,
        }
    ],
    run: async (client, interaction) => {
       if (!interaction.member.permissions.has('BAN_MEMBERS')) return interaction.reply('You do not have permission');
        const user = interaction.options.getUser('user');
        if (user.id === interaction.user.id) return interaction.reply('You can not ban yourself');
        const reason = interaction.options.getString('reason');
        const days = interaction.options.getInteger('days');
        try {
            interaction.guild.members.ban(user.id, { reason, days });
            interaction.reply('Success');
        } catch (err) {
            interaction.reply('Error');
            console.error(err);
        }
    },
};