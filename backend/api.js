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
    return res.status(403).json({ message: 'Нет доступа: только админы могут создавать розыгрыши.' });
  }

  if (!title || !Array.isArray(prizes) || prizes.length === 0) {
    return res.status(400).json({ message: 'Некорректные данные.' });
  }

  raffles.push({ title, prizes, createdAt: new Date() });
  res.json({ message: 'Розыгрыш успешно создан!' });
});

app.get('/api/raffles', (req, res) => {
  res.json(raffles);
});

app.listen(3000, () => {
  console.log('Сервер запущен на порту 3000');
});
