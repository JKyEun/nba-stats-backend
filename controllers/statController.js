const axios = require('axios');
const cheerio = require('cheerio');

const getStats = async (req, res) => {
  try {
    const url = 'https://www.melon.com/chart/';
    const stat = await axios.get(url);
    const $ = cheerio.load(stat);
    const name = $(
      '#lst50 > td:nth-child(6) > div > div > div.ellipsis.rank01 > span > a',
    ).text();
    console.log(name);
    res.status(200).send(name);
  } catch (err) {
    console.error(err);
    res.status(500).send('500번 에러입니다.');
  }
};

module.exports = {
  getStats,
};
