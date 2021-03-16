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
