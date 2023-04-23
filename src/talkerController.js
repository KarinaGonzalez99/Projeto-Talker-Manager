const fs = require('fs/promises');

const TALKER_JSON_PATH = './src/talker.json';

const getAllTalkers = async (_req, res) => {
     try {
       const talkersData = await fs.readFile(TALKER_JSON_PATH, 'utf-8'); // Modifique esta linha
       const talkers = JSON.parse(talkersData);
       return res.status(200).json(talkers);
     } catch (error) {
       console.error(`Erro ao ler o arquivo talker.json: ${error.message}`);
       return res.status(200).json([]);
     }
   };

const getTalkerById = async (req, res) => {
     try {
       const { id } = req.params;
       const talkersData = await fs.readFile('./src/talker.json', 'utf-8');
       const talkers = JSON.parse(talkersData);
       const talkerers = talkers.find((talker) => talker.id === parseInt(id, 10));
   
       if (!talkerers) {
         return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
       }
   
       return res.status(200).json(talkerers);
     } catch (error) {
       console.error(`Erro ao ler o arquivo talkerers.json: ${error.message}`);
       return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
     }
   };
   
   const updateTalkerById = async (req, res) => {
     const { id } = req.params;
     const { name, age, talk } = req.body;
     const talkers = JSON.parse(await fs.readFile(TALKER_JSON_PATH, 'utf8'));
     const talkerIndex = talkers.findIndex((talker) => talker.id === parseInt(id, 10));
   
     if (talkerIndex === -1) {
       return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
     }
   
     const updatedTalker = { id: parseInt(id, 10), name, age, talk };
     talkers[talkerIndex] = updatedTalker;
     await fs.writeFile('./src/talker.json', JSON.stringify(talkers));
     res.status(200).json(updatedTalker);
   };
   
   module.exports = {
     getAllTalkers,
     getTalkerById,
     updateTalkerById,
   };   