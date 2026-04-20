import express from 'express';
import cors from 'cors';
import { questions } from '../src/data/questions.js';
import { characters } from '../src/data/characters.js';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.get('/api/questions', (req, res) => {
  res.json(questions);
});

app.get('/api/characters', (req, res) => {
  res.json(characters);
});

app.post('/api/results', (req, res) => {
  res.json({ success: true, id: Date.now() });
});

app.listen(PORT, () => {
  console.log(`Mock API服务器运行在 http://localhost:${PORT}`);
});
