const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

// Store timers for each user
const userTimers = {};

app.post('/set_timer/:userId', (req, res) => {
  const { userId } = req.params;
  const { duration } = req.body;

  // Create a new timer for the user
  userTimers[userId] = { duration, interval: undefined };
  res.json({ message: 'Countdown timer set successfully!' });
});

app.get('/get_timer/:userId', (req, res) => {
  const { userId } = req.params;
  const userTimer = userTimers[userId];

  if (userTimer) {
    res.json({ duration: userTimer.duration });
  } else {
    res.status(404).json({ message: 'User not found or timer not set.' });
  }
});

app.post('/start_timer/:userId', (req, res) => {
  const { userId } = req.params;
  const userTimer = userTimers[userId];

  if (userTimer && userTimer.duration > 0 && !userTimer.interval) {
    userTimer.interval = setInterval(() => {
      userTimer.duration -= 1000;
      if (userTimer.duration === 0) {
        clearInterval(userTimer.interval);
        userTimer.interval = undefined;
      }
    }, 1000);
    res.json({ message: 'Countdown timer started!' });
  } else {
    res.status(404).json({ message: 'User not found or timer already running.' });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});