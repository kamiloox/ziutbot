module.exports = (msgDetails) => {
  const { message, args } = msgDetails;
  if (!message.member.voice.channel) {
    return message.channel.send('You must be connected to voice channel!');
  }

  const defaultRadioID = 118;
  const [radioID = defaultRadioID] = args;
  const radioDetails = { ...msgDetails, radioID };

  return radioDetails;
};
