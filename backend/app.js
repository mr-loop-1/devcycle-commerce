const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes/routes');

require('dotenv').config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.disable('x-powered-by');
app.use(express.urlencoded({ extended: false }));

app.use(routes);

app.use((req, res) => {
  return res.send(200).json({ message: 'okay' });
});

const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
  console.log(`node: listning on port ${port}...`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.log(`node: port ${port} is already in use.`);
    if (remainingAttempts-- > 0) {
      port++;
      setTimeout(() => server.listen(port), 500);
    }
  }
});
