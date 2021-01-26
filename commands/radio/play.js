const { streamURL } = require('../../config/main.json');

module.exports = async ({ args, message }) => {
  const [, radioID = 118] = args;
  const connection = await message.member.voice.channel.join();
  connection.play(`${streamURL.leftPiece}${radioID}${streamURL.rightPiece}`);
};
