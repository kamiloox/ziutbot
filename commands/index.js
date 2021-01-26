const { client } = require('../config/discord');
const { prefix } = require('../config/main.json');

const commands = {
  radio: () => console.log('i am radio'),
};

module.exports = () => {
  client.on('message', (message) => {
    if (message.author.bot) return;

    const typedPrefix = message.content[0];
    if (typedPrefix !== prefix) return message.channel.send('bad prefix');

    const command = message.content.substring(1);
    if (commands[command]) return commands[command]();

    return message.channel.send('unkown command');
  });
};
