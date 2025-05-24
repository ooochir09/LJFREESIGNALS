const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
const ADMIN_IDS = [5354822471, 5288984314];
app.use(cors());
app.use(bodyParser.json());

let raffles = [];

app.post('/api/createRaffle', (req, res) => {
  const { title, prizes, user_id } = req.body;
  if (!ADMIN_IDS.includes(user_id)) return res.status(403).json({ message: 'Нет доступа' });
  if (!title || !Array.isArray(prizes) || prizes.length===0) return res.status(400).json({ message: 'Неверные данные' });
  const newRaffle = { id: uuidv4(), title, prizes, createdBy: user_id, createdAt: new Date(), participants: [], winners: [] };
  raffles.push(newRaffle);
  res.json({ message: 'Розыгрыш создан', raffle: newRaffle });
});

app.get('/api/raffles', (req, res) => res.json(raffles));

const port = process.env.PORT||3000;
app.listen(port, () => console.log(`Server running on ${port}`));
