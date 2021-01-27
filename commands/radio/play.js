const { streamURL, radioWebsite } = require('../../config/main');

module.exports = async ({ args, message }) => {
  const { page } = await require('../../config/puppeteer');

  // check if radioID is passed as `!radio play ${radioID}` or `!radio ${radioID}`
  const radioID = args[0] === 'play' ? args[1] : args[0];
  const connection = await message.member.voice.channel.join();
  const defaultRadioID = 118;
  connection.play(`${streamURL}${radioID || defaultRadioID}`);

  await page.goto(`${radioWebsite}${radioID || defaultRadioID}`);
};
