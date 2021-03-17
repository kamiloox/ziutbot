const defaultHandler = require('./defaultHandler');

module.exports = async (msgDetails) => {
  defaultHandler(msgDetails, async ({ message, isUserListening }) => {
    const listen = isUserListening(message, true);
    if (!listen) return;

    const { page } = await require('../../config/puppeteer');

    await page.waitForSelector(
      '#station-view .station-details > .next-tracks-list > li > span:not(:empty)',
    );

    const tracksList = await page.evaluate(() => {
      const scrapedSongs = [
        ...document.querySelectorAll('#station-view .station-details > .next-tracks-list > li > *'),
      ];

      const songs = [];
      scrapedSongs.map((song) => songs.push(song.textContent));

      return songs;
    });

    message.channel.send(tracksList.map((song, i) => `${i + 1}: ${song}`).join('\n'));
  });
};
