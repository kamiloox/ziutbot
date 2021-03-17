const { client } = require('../config/discord');

const getNumberOfUsers = async (channelId) => {
  try {
    const channel = await client.channels.fetch(channelId);
    const numberOfUsers = channel.members.size - 1;
    return numberOfUsers;
  } catch (err) {
    return null;
  }
};

exports.onUserLeavesChannel = (callback) => {
  client.on('voiceStateUpdate', async (oldState, newState) => {
    if (newState.channelID === null || oldState.channelID !== newState.channelID) {
      const numberOfUsers = await getNumberOfUsers(oldState.channelID);
      const botInstance = oldState.guild.me;
      callback(botInstance, numberOfUsers);
    }
  });
};

exports.onBotMoved = (callback) => {
  client.on('voiceStateUpdate', async (oldState, newState) => {
    const isBotMoved = client.user.id === newState.id; // Client is equal to bot
    if (!isBotMoved) return;
    const numberOfUsers = await getNumberOfUsers(newState.channelID);
    const botInstance = oldState.guild.me;
    callback(botInstance, numberOfUsers);
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
