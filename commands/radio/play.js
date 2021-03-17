const { streamURL, radioWebsite } = require('../../config/main');
const { onUserLeavesChannel, onBotMoved } = require('../../utils/index');
const defaultHandler = require('./defaultHandler');

const disconnectBot = (message, botInstance, numberOfUsers) => {
  if (numberOfUsers === 0) {
    botInstance.voice.channel.leave();
    message.channel.send('I left voice channel because nobody is listening to me :(');
  }
};

module.exports = (msgDetails) => {
  defaultHandler(msgDetails, async ({ radioID, message }) => {
    const { page } = await require('../../config/puppeteer');

    const connection = await message.member.voice.channel.join();
    connection.play(`${streamURL}${radioID}`);

    onUserLeavesChannel((botInstance, numberOfUsers) => {
      disconnectBot(message, botInstance, numberOfUsers);
    });

    onBotMoved((botInstance, numberOfUsers) => {
      disconnectBot(message, botInstance, numberOfUsers);
    });

    await page.goto(`${radioWebsite}${radioID}`);
  });
};
