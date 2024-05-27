const login = require('express').Router();
const modelUser = require('../../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

login.post('/loginuser', async (req, res) => {
    const { email, password } = req.body;
    const user = await modelUser.findOne({ email });

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    if (user.isActive === false) {
      return res.status(403).json({ msg: 'Account not activated' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ msg: 'Invalid password' });
    }

    const token = jwt.sign({id:user._id}, 'secret');
    res.json({token});
});

module.exports = login;