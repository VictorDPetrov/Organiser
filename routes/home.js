const express = require('express');
const database = require('../controller/database');
const router = express.Router();

router.get('/', async (req, res) => {
    database.database.query('SELECT username FROM users WHERE username = ?', req.session.username, function (selectErr, selectResult) {
        if (!req.session.loggedin) {
            res.redirect('/');
        }
        else {
            res.render("../views/home", {
                username: Object.values(selectResult[0])
            });
        }
    })
})

module.exports = router