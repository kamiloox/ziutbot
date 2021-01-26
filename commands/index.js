const { client } = require('../config/discord');
const { prefix } = require('../config/main.json');
const radio = require('./radio');

const commands = {
  radio: (msgDetails) => radio(msgDetails),
};

module.exports = () => {
  client.on('message', (message) => {
    if (message.author.bot) return;

    const typedPrefix = message.content[0];
    if (typedPrefix !== prefix) return message.channel.send('bad prefix');

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
