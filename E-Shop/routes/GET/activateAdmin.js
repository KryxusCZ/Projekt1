const activateUser = require('express').Router();
const modelUser = require('../../models/userModel');


activateUser.get("/activate/:authCode", async (req, res) => {
    try {
        const authCode = req.params.authCode;
        const user = await modelUser.findOne({code:authCode})

        if(!user){
            res.json({
                msg: `Váš účet nebyl aktivován.`
            });  
        }

        else{
            user.isActive = true;
            await user.save();
            res.json({
                msg: `Váš účet byl aktivován`
            });
        }

    } catch (error) {
        console.error("Chyba při ukládání uživatele:", error);
        res.status(500).json({ msg: "Bohužel došlo k chybě při ukládání uživatele nebo odesílání ověřovacího kódu." });
    }
});

module.exports = activateUser;