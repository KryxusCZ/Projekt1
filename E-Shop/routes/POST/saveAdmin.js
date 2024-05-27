const saveUser = require('express').Router();
const modelUser = require('../../models/userModel');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'kryxer29@gmail.com',
        pass: 'ckpe gcgm ejwh rewg'  
    }
});

const generateVerificationCode = () => {
    return Math.floor(10000 + Math.random() * 90000);
};

saveUser.post("/save-admin", async (req, res) => {
    const { name, email, password } = req.body;
    const verificationCode = generateVerificationCode();
    const hashedPassword = await bcrypt.hash(password, 10);
    const activateadress = `http://localhost:5000/activate/${verificationCode}`;

    try {
        const user = new modelUser({
            name: name,
            email: email,
            password: hashedPassword,
            code: verificationCode,
            
        });

        const savedUser = await user.save();

        await transporter.sendMail({
            to: email,
            subject: 'Ověření účtu',
            html: `<p>Klikněte zde: <a href="${activateadress}">${activateadress}</a> a váš účet bude aktivován</p>`
        });

        res.json({
            msg: `Uživatel ${savedUser.email} byl úspěšně uložen a ověřovací kód byl odeslán na e-mail.`
        });
    } catch (error) {
        console.error("Chyba při ukládání uživatele:", error);
        res.status(500).json({ msg: "Bohužel došlo k chybě při ukládání uživatele nebo odesílání ověřovacího kódu." });
    }
});

module.exports = saveUser;