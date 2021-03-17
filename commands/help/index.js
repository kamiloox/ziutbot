const mainHelp = require('../../data/mainHelp');
const { prefix } = require('../../config/main');

let helpPage = '***HELP FOR ZIUTBOT***\nq';
mainHelp.forEach((group) => {
  const [type] = Object.keys(group);
  helpPage += `\n**${type}**:`;
  group[type].forEach(({ command, description, usage }) => {
    helpPage += `
      \`${command}\`: ${description}
      usage: \`${prefix}${usage}\``;
  });
});

module.exports = ({ message }) => {
  message.channel.send(helpPage);
};
