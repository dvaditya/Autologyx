const dotEnv = require('dotenv');
const proxy = require('express-http-proxy');
const cors = require('cors');
const express = require('express');

dotEnv.config();

const LISTENING_PORT = process.env.REACT_APP_PROXY_PORT;

const app = express();
app.use(cors());
app.use('/', proxy(process.env.ALX_INSTANCE));
app.listen(LISTENING_PORT);
console.log(
  `Proxy server listening on port ${LISTENING_PORT} - directing to ${process.env.ALX_INSTANCE}`
);
