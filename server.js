const express = require('express');
const cors = require('cors');
require('dotenv').config();

const server = express();
const { PORT } = process.env;

server.use(
  cors({
    origin: 'http://dev-city.link',
    credentials: true,
    optionsSuccessStatus: 200,
  }),
);

server.use(express.json({ limit: 5000000 }));
server.use(express.urlencoded({ extended: false }));

const statRouter = require('./routes/stat');

server.use('/stat', statRouter);

// eslint-disable-next-line no-unused-vars
server.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(err.statusCode);
  res.send(err.message);
});

server.listen(PORT, () => {
  console.log(`${PORT}번에서 서버가 작동 중입니다!`);
});
