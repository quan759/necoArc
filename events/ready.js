module.exports = (client) => {
    console.log('Bot is ready!');
    client.user.setPresence({ activities: [{ name: 'nco help'}], status: 'idle'} );
}