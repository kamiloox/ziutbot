const { streamURL, radioWebsite } = require('../../config/main');
const defaultHandler = require('./defaultHandler');

module.exports = async (msgDetails) => {
  const { radioID, message } = defaultHandler(msgDetails);
  const { page } = await require('../../config/puppeteer');

  const connection = await message.member.voice.channel.join();
  connection.play(`${streamURL}${radioID}`);

  await page.goto(`${radioWebsite}${radioID}`);
};
