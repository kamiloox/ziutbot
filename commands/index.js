const { client } = require('../config/discord');
const { prefix } = require('../config/main');
const radio = require('./radio/play');
const title = require('./radio/title');

const commands = {
  radio: (msgDetails) => radio(msgDetails),
  title: (msgDetails) => title(msgDetails),
};

module.exports = () => {
  client.on('message', (message) => {
    if (message.author.bot) return;

    const typedPrefix = message.content[0];
    if (typedPrefix !== prefix) return;

    const [command, ...args] = message.content.substring(1).trim().split(' ');
    const msgDetails = {
      message,
      command,
      args,
    };
    if (commands[command]) return commands[command](msgDetails);

    return message.channel.send('unkown command');
  });
};
