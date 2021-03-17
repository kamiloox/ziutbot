const { client } = require('../config/discord');
const { prefix } = require('../config/main');
const help = require('./help');
const radio = require('./radio/play');
const title = require('./radio/title');
const tracks = require('./radio/tracks');

const commands = {
  help: (msgDetails) => help(msgDetails),
  radio: (msgDetails) => radio(msgDetails),
  title: (msgDetails) => title(msgDetails),
  tracks: (msgDetails) => tracks(msgDetails),
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
