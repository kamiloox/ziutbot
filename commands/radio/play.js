const { streamURL, radioWebsite } = require('../../config/main.json');

module.exports = async ({ args, message }) => {
  const { page } = await require('../../config/puppeteer');

  // check if radioID is passed as `!radio play ${radioID}` or `!radio ${radioID}`
  const radioID = args[0] === 'play' ? args[1] : args[0];
  const connection = await message.member.voice.channel.join();
  connection.play(`${streamURL.leftPiece}${radioID}${streamURL.rightPiece}`);

  await page.goto(radioWebsite + radioID);
};
