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
            database.database.query('SELECT * FROM tasks WHERE taskID = ?', req.query.id, function (moveError, moveResult) {
                if (moveError) {
                    throw moveError;
                }
                else {
                    database.database.query('UPDATE tasks SET taskStatus = "Приключенo" WHERE taskID = ?', req.query.id, function (updateErr, updateResult) {
                        if (updateErr) {
                            throw updateErr;
                        }
                        else {
                            res.redirect('/home');
                        }
                    })
                }
            })
        }
    })
})

module.exports = router;