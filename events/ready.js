module.exports = (client) => {
    console.log('Bot is ready!');
    client.user.setPresence({ activities: [{ name: `what's your emergency?`}], status: 'idle'} );
}