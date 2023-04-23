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

module.exports = { getAllTalkers };