const CheckLogin = require('express').Router();
const checkToken = require('./CheckToken');

CheckLogin.get("/check-login", checkToken, async (req, res) => {
    console.log('hotovo');
    return res.json({ message: 'login'});
});

module.exports = CheckLogin;