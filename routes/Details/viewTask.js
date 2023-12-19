const express = require('express');
const database = require('../../controller/database');
const router = express.Router();
const moment = require('moment');

router.get('/', async (req, res) => {
    database.database.query('SELECT username FROM users WHERE username = ?', req.session.username, function (selectErr, selectResult) {
        if (!req.session.loggedin) {
            res.redirect('/');
        }
        else {
            database.database.query('SELECT * FROM tasks WHERE taskID = ?', req.query.id, function (err, rows) {
                if (err) {
                    throw err;
                }
                else {
                    res.render("../views/Details/viewTask", {
                        username: Object.values(selectResult[0]),
                        moment,
                        rowResult: rows[0]
                    });
                }
            })
        }
    })
})

module.exports = router;