const validateToken = (req, res, next) => {
     const token = req.headers.authorization;
     if (!token) {
       return res.status(401).json({ message: 'Token não encontrado' });
     }
     if (token.length !== 16) {
       return res.status(401).json({ message: 'Token inválido' });
     }
     next();
   };
   
   const validateName = (name, res) => {
     if (!name) {
       return res.status(400).json({ message: 'O campo "name" é obrigatório' });
     }
   
     if (name.length < 3) {
       return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
     }
   
     return null;
   };
   
   const validateAge = (age, res) => {
     if (!age) {
       return res.status(400).json({ message: 'O campo "age" é obrigatório' });
     }
   
     if (!Number.isInteger(age) || age < 18) {
       return res.status(400)
       .json({ message: 'O campo "age" deve ser um número inteiro igual ou maior que 18' });
     }
   
     return null;
   };
   
   const validateWatchedAt = (watchedAt, res) => {
     if (!watchedAt) {
       return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
     }
   
     if (!/^\d{2}\/\d{2}\/\d{4}$/.test(watchedAt)) {
       return res.status(400)
       .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
     }
   
     return null;
   };
   
   function isValidRate(rate) {
     return Number.isInteger(rate) && rate >= 1 && rate <= 5;
   }
   
   function validateRate(rate, res) {
     if (rate === undefined || rate === null) {
       return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
     }
   
     if (!isValidRate(rate)) {
       return res.status(400)
       .json({ message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' });
     }
   
     return null;
   }
   
   const validateTalk = (talk, res) => {
     if (!talk) {
       return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
     }
   
     const watchedAtValidation = validateWatchedAt(talk.watchedAt, res);
     if (watchedAtValidation) {
       return watchedAtValidation;
     }
   
     const rateValidation = validateRate(talk.rate, res);
     if (rateValidation) {
       return rateValidation;
     }
   
     return null;
   };
   
   const validateTalkerData = (req, res, next) => {
     const { name, age, talk } = req.body;
   
     const nameValidation = validateName(name, res);
     if (nameValidation) {
       return nameValidation;
     }
   
     const ageValidation = validateAge(age, res);
     if (ageValidation) {
       return ageValidation;
     }
   
     const talkValidation = validateTalk(talk, res);
     if (talkValidation) {
       return talkValidation;
     }
   
     return next();
   };
   
   module.exports = {
     validateToken,
     validateTalkerData,
   };   