const play = require('./play');

const subcommands = {
  play: (msgDetails) => play(msgDetails),
};

module.exports = (msgDetails) => {
  const { message, command, args } = msgDetails;
  if (!message.member.voice.channel) {
    return message.channel.send('You must be connected to voice channel!');
  }

  const [subcommand] = args;
  if (!subcommand) return subcommands.play(msgDetails); // default command
  if (subcommands[subcommand]) return subcommands[subcommand](msgDetails);

  return message.channel.send(
    `unkown subcommand **${subcommand}** for command **${command}**`
  );
};