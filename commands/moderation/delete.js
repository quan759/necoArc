
module.exports = {
  name: 'delete',
  category: 'mod',
  description: 'Delete a specified number of messages in a channel',
  run: async (client, message, args) => {
    if (!message.member.permissions.has('MANAGE_MESSAGES')) {
      return message.channel.send('You do not have permission to use this command.');
    }

    if (!args.length) {
      return message.channel.send('You need to provide the number of messages you want to delete.');
    }

   
    const numToDelete = parseInt(args[0]);

    if (isNaN(numToDelete) || numToDelete <= 0) {
      return message.channel.send('Invalid number of messages to delete.');
    }

    try {
      const fetchedMessages = await message.channel.messages.fetch({ limit: numToDelete });
      await message.channel.bulkDelete(fetchedMessages);
      message.channel.send(`Successfully deleted ${fetchedMessages.size} messages.`);
    } catch (error) {
      console.error('Error while deleting messages:', error);
      message.channel.send('An error occurred while deleting messages.');
    }
  },
};
