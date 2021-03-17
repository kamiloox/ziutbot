const { streamURL, radioWebsite } = require('../../config/main');
const { onUserLeavesChannel } = require('../../utils/index');
const defaultHandler = require('./defaultHandler');

module.exports = (msgDetails) => {
  defaultHandler(msgDetails, async ({ radioID, message }) => {
    const { page } = await require('../../config/puppeteer');

    const connection = await message.member.voice.channel.join();
    connection.play(`${streamURL}${radioID}`);

    onUserLeavesChannel((numberOfUsers) => {
      if (numberOfUsers === 0) {
        message.guild.me.voice.channel.leave();
        message.channel.send('I left voice channel because nobody is listening to me :(');
      }
    });

    await page.goto(`${radioWebsite}${radioID}`);
  });
};
