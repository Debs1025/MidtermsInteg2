const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function registerUser({username, password, role, id}) {
   const salt = await bcrypt.genSalt(10);
   const hashedPassword = await bcrypt.hash(password, salt);

   const user = new User({ 
      username, 
      password: hashedPassword, 
      role, 
      id 
   });
   
   await user.save();
   return user;
}

const authenticateUser = async (username, password) => {
   const user = await User.findOne({ username });
   if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign( 
          { id: user.id || user._id, username: user.username, role: user.role },
          process.env.jwt_Key 
      );
      return { user, token };
   }
   
   throw new Error('Invalid credentials');
}
module.exports = { registerUser, authenticateUser };