module.exports = (client) => {
    console.log('Bot is ready!');
    client.user.setPresence({ activities: [{ name: 'osu'}], status: 'idle'} );
}