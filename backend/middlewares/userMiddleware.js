const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
   const auth = req.headers.authorization;
   if (!auth || !auth.startsWith('Bearer ')) return res.status(401).json({ message: 'Unauthorized' });

   const token = auth.split(' ')[1];
   try {
      const payload = jwt.verify(token, process.env.jwt_Key);
      req.user = payload;
      return next();
   } catch (err) {
      return res.status(401).json({ message: 'Invalid token' });
   }
};