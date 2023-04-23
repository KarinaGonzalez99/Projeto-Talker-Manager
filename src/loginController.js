const crypto = require('crypto');

const generateRandomToken = () => crypto.randomBytes(8).toString('hex');

const login = (_req, res) => {
  const token = generateRandomToken();
  return res.status(200).json({ token });
};

const validateLogin = (req, res, next) => {
     const { email, password } = req.body;

     if (!email) {
       return res.status(400).json({ message: 'O campo "email" é obrigatório' });
     }
     if (!/^[\w.]+@[a-zA-Z]+\.[a-zA-Z]{2,3}(?:\.[a-zA-Z]{2})?$/.test(email)) {
       return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
     }
   
     if (!password) {
       return res.status(400).json({ message: 'O campo "password" é obrigatório' });
     }
     if (password.length < 6) {
       return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
     }
        next();
   };
   
   module.exports = { login, validateLogin };