const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const ADMIN_IDS = [5354822471, 5288984314];

app.use(cors());
app.use(bodyParser.json());

let raffles = [];

app.post('/api/createRaffle', (req, res) => {
  const { title, prizes, user_id } = req.body;

  if (!ADMIN_IDS.includes(user_id)) {
    return res.status(403).json({ message: 'Нет доступа' });
  }

  if (!title || !Array.isArray(prizes) || prizes.length === 0) {
    return res.status(400).json({ message: 'Данные невалидны' });
  }

  raffles.push({ title, prizes, createdAt: new Date() });
  res.json({ message: 'Розыгрыш создан!' });
});

app.get('/api/raffles', (req, res) => {
  res.json(raffles);
});

module.exports = app;
