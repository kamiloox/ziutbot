const { client } = require('./config/discord');
const { token } = require('./config/main.json');

client.once('ready', () => {
  console.log('i am ready');
});

client.login(token);
