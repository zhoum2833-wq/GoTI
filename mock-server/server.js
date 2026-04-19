const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

let questions, characters;

try {
  questions = require('../src/data/questions').questions;
  characters = require('../src/data/characters').characters;
} catch (error) {
  console.error('加载数据失败:', error.message);
  console.log('请确保在项目根目录运行此服务器');
  process.exit(1);
}

const results = [];

app.get('/api/questions', (req, res) => {
  console.log('[GET] /api/questions');
  res.json(questions);
});

app.get('/api/questions/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const question = questions.find(q => q.id === id);
  
  if (question) {
    res.json(question);
  } else {
    res.status(404).json({ error: 'Question not found' });
  }
});

app.get('/api/characters', (req, res) => {
  console.log('[GET] /api/characters');
  res.json(characters);
});

app.get('/api/characters/:id', (req, res) => {
  const id = req.params.id;
  const character = characters[id];
  
  if (character) {
    res.json(character);
  } else {
    res.status(404).json({ error: 'Character not found' });
  }
});

app.post('/api/results', (req, res) => {
  console.log('[POST] /api/results');
  console.log('保存结果:', {
    topMatch: req.body.topMatch?.name,
    percentage: req.body.topMatch?.percentage,
    timestamp: req.body.timestamp
  });
  
  const result = {
    id: Date.now(),
    ...req.body,
    savedAt: new Date().toISOString()
  };
  
  results.push(result);
  
  res.json({
    success: true,
    id: result.id,
    message: '结果保存成功'
  });
});

app.get('/api/results', (req, res) => {
  console.log('[GET] /api/results');
  res.json({
    total: results.length,
    results: results
  });
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

app.listen(PORT, () => {
  console.log('');
  console.log('========================================');
  console.log('   GoTI Mock API Server');
  console.log('========================================');
  console.log('');
  console.log(`服务器运行在: http://localhost:${PORT}`);
  console.log('');
  console.log('可用的API端点:');
  console.log(`  GET  http://localhost:${PORT}/api/questions`);
  console.log(`  GET  http://localhost:${PORT}/api/characters`);
  console.log(`  POST http://localhost:${PORT}/api/results`);
  console.log(`  GET  http://localhost:${PORT}/api/health`);
  console.log('');
  console.log('按 Ctrl+C 停止服务器');
  console.log('');
});
