const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

let countdownDuration = 0;
let countdownInterval;

app.post('/set_timer', (req, res) => {
  const { duration } = req.body;
  countdownDuration = duration;
  res.json({ message: 'Countdown timer set successfully!' });
});

app.get('/get_timer', (req, res) => {
  res.json({ duration: countdownDuration });
});

app.post('/start_timer', (req, res) => {
  if (countdownDuration > 0 && !countdownInterval) {
    countdownInterval = setInterval(() => {
      countdownDuration -= 1;
      if (countdownDuration === 0) {
        clearInterval(countdownInterval);
        countdownInterval = undefined;
      }
    }, 1000);
    res.json({ message: 'Countdown timer started!' });
  } else {
    res.json({ message: 'No countdown timer set or timer already running.' });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
