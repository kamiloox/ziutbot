const subcommands = {
  play: () => console.log('playing from subcommand'),
};

module.exports = ({ message, command, args }) => {
  if (!message.member.voice.channel) {
    return message.channel.send('You must be connected to voice channel!');
  }

  const subcommand = args[0];
  if (!subcommand) return subcommands.play(); // default command
  if (subcommands[subcommand]) return subcommands[subcommand]();

  return message.channel.send(
    `unkown subcommand **${subcommand}** for command **${command}**`
  );
};
