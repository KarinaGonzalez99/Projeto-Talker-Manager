const express = require('express');
const fs = require('fs').promises;

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

const { getAllTalkers, getTalkerById, 
  updateTalkerById, deleteTalkerById } = require('./talkerController');
const { login, validateLogin } = require('./loginController');
const { validateToken, validateTalkerData } = require('./middleware');

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', getAllTalkers);

app.get('/talker/:id', getTalkerById);

app.post('/login', validateLogin, login);

app.post('/talker', validateToken, validateTalkerData, async (req, res) => {
  const { name, age, talk } = req.body;
  const talkers = JSON.parse(await fs.readFile('./src/talker.json', 'utf8'));
  const newId = talkers.length ? Math.max(...talkers.map((talker) => talker.id)) + 1 : 1;
  const newTalker = { id: newId, name, age, talk };
  talkers.push(newTalker);
  await fs.writeFile('./src/talker.json', JSON.stringify(talkers));
  res.status(201).json(newTalker);
});

app.put('/talker/:id', validateToken, validateTalkerData, updateTalkerById);

app.delete('/talker/:id', validateToken, deleteTalkerById);

app.listen(PORT, () => {
  console.log('Online');
});
