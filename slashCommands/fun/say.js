module.exports = {
    name: 'say',
    description: 'Force the bot to say something',
    type: 'CHAT_INPUT',
    options: [
        {
            name: 'query',
            description: 'Content',
            type: 'STRING',
            required: true,
        }
    ],
    run: async (client, interaction) => {
        const query = interaction.options.getString('query');
        interaction.reply({ content: 'Success', ephemeral: true });
        interaction.channel.send(query);
    },
};