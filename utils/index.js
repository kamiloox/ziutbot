const { client } = require('../config/discord');

exports.onUserLeavesChannel = (callback) => {
  client.on('voiceStateUpdate', async (oldState, newState) => {
    if (newState.channelID === null) {
      const channel = await client.channels.fetch(oldState.channelID);
      const numberOfUsers = channel.members.size - 1;
      callback(numberOfUsers);
    }
  });
};

exports.isUserListening = (message, shouldListen = false) => {
  const authorChannelId = message.guild.member(message.author).voice.channelID;
  const botChannelId = message.guild.me.voice.channel?.id;
  if (authorChannelId === botChannelId) {
    return true;
  }
  if (shouldListen) message.channel.send('You must listen to radio to use this command!');
  return false;
};
