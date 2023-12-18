const express = require('express');
const session = require('express-session');
const database = require('../controller/database');
const bodyParser = require('body-parser');
const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get('/', async (req, res) => {
    res.render("../views/Login/login");
});

router.post('/', async (req, res) => {
    const {username, pass} = req.body;

    if (username && pass) {
        database.database.query("SELECT * FROM users WHERE username = ? AND pass = ?", [username, pass], function (selectError, result) {
            if (selectError) {
                throw selectError;
            }
            else {
                if (result.length > 0) {
                    req.session.loggedin = true;
                    req.session.username = username;
    
                    res.redirect('/home')
                }
                else {
                    res.sendStatus(401);
                }
            }
            res.end();
        })
    }
})

module.exports = router;