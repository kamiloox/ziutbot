const { client } = require('./config/discord');
const { token } = require('./config/main.json');
require('./commands')();

client.once('ready', () => {
  console.log('i am ready');
});

client.login(token);
