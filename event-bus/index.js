const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const morgan = require('morgan');

const app = express();
app.use(bodyParser.json());
app.use(morgan('tiny'));

const events = [];

// event endpoints
const subscribers = [
  'http://posts-clusterip-srv:4000/events',
  // 'http://localhost:4001/events',
  // 'http://localhost:4002/events',
  // 'http://localhost:4003/events',
];

app.post('/events', (req, res) => {
  const event = req.body;

  events.push(event);

  for (let subscriber of subscribers) {
    try {
      axios.post(subscriber, event);
    } catch (_) {
      console.log(`Caught exception: ${subscriber}`);
    }
  }

  res.send({ status: 'OK' });
});

app.get('/events', (req, res) => {
  res.json(events);
});

app.listen(4005, () => {
  console.log('Listening on 4005');
});
