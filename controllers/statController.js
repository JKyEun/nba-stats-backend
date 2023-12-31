const axios = require('axios');
const cheerio = require('cheerio');

const getStats = async (req, res) => {
  try {
    const url =
      'https://sports.news.naver.com/basketball/record/index.nhn?category=nba&year=2023';
    const stat = await axios.get(url);

    const $ = cheerio.load(stat.data);
    const rank = $('#playerRecordTable').text();
    const arr = rank
      .trim()
      .split('\n')
      .map((el) => el.trim())
      .filter((el) => el !== '');
    const dataArr = [];
    const eachPlayer = {};
    for (let i = 0; i < 281; i++) {
      if (i % 14 === 0) {
        dataArr.push({ ...eachPlayer });
        eachPlayer.rank = +arr[i];
      } else if (i % 14 === 1) {
        eachPlayer.name = arr[i];
      } else if (i % 14 === 2) {
        eachPlayer.games = +arr[i];
      } else if (i % 14 === 3) {
        eachPlayer.points = +arr[i];
      } else if (i % 14 === 4) {
        eachPlayer.assist = +arr[i];
      } else if (i % 14 === 5) {
        eachPlayer.rebound = +arr[i];
      } else if (i % 14 === 6) {
        eachPlayer.steal = +arr[i];
      } else if (i % 14 === 7) {
        eachPlayer.block = +arr[i];
      } else if (i % 14 === 8) {
        eachPlayer.fgNum = +arr[i];
      } else if (i % 14 === 9) {
        eachPlayer.pt3Num = +arr[i];
      } else if (i % 14 === 10) {
        eachPlayer.ftNum = +arr[i];
      } else if (i % 14 === 11) {
        eachPlayer.fgRate = +arr[i];
      } else if (i % 14 === 12) {
        eachPlayer.pt3Rate = +arr[i];
      } else if (i % 14 === 13) {
        eachPlayer.ftRate = +arr[i];
      }
    }
    dataArr.shift();
    res.status(200).send(dataArr);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error 500.');
  }
};

module.exports = {
  getStats,
};
