const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const ADMIN_ID = 5288984314;

app.use(cors());
app.use(bodyParser.json());

let raffles = [];

app.post('/api/createRaffle', (req, res) => {
  const { title, prizes, user_id } = req.body;

  if (user_id !== ADMIN_ID) {
    return res.status(403).json({ message: 'Нет доступа' });
  }

  raffles.push({ title, prizes, createdAt: new Date() });
  res.json({ message: 'Розыгрыш создан!' });
});

app.get('/api/raffles', (req, res) => {
  res.json(raffles);
});

app.listen(3000, () => {
  console.log('Сервер запущен на порту 3000');
});
