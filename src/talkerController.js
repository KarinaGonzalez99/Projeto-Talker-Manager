const fs = require('fs/promises');

const getAllTalkers = async (_req, res) => {
  try {
    const talkersData = await fs.readFile('./src/talker.json', 'utf-8');
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
       const talker = talkers.find((talker) => talker.id === parseInt(id, 10));
   
       if (!talker) {
         return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
       }
   
       return res.status(200).json(talker);
     } catch (error) {
       console.error(`Erro ao ler o arquivo talker.json: ${error.message}`);
       return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
     }
   };
   
   module.exports = { getAllTalkers, getTalkerById };