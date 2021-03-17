const defaultHandler = require('./defaultHandler');

module.exports = async (msgDetails) => {
  const { message, isUserListening } = defaultHandler(msgDetails);

  const listen = isUserListening(message, true);
  if (!listen) return;

  const { page } = await require('../../config/puppeteer');

  await page.waitForSelector('#station-view .station-details > h2:not(:empty)');

  const musicDetails = await page.evaluate(() => {
    const [title, artist, album] = document.querySelectorAll('#station-view .station-details > *');

    return {
      artist: artist.textContent,
      title: title.textContent,
      album: album.textContent,
    };
  });

  const { title, artist, album } = musicDetails;
  message.channel.send(`now playing: **${title}** by **${artist}** (album: *${album}*)`);
};
