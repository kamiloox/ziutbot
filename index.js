const { client } = require('./config/discord');
const { token, prefix } = require('./config/main.json');
require('./commands')();

client.once('ready', () => {
  console.log('i am ready');
  client.user.setActivity(`${prefix}help !`);
});

client.login(token);
