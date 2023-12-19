const express = require('express');
const database = require('../controller/database');
const router = express.Router();
const moment = require('moment');

router.get('/', async (req, res) => {
    if (!req.session.loggedin) {
        res.redirect('/');
    }
    else {
        database.database.query('SELECT username FROM users WHERE username = ?', req.session.username, function (selectErr, selectResult) {
            if (selectErr) {
                throw selectErr;
            }
            else {
                database.database.query('SELECT * FROM tasks WHERE taskStatus = "Добавено" ORDER BY taskID DESC', function (taskError, taskResult) {
                    if (taskError) {
                        throw taskError;
                    }
                    else {
                        database.database.query('SELECT * FROM tasks WHERE taskStatus = "Приключенo" ORDER BY taskID DESC', function (finishedError, finishedResult) {
                            if (finishedError) {
                                throw finishedError;
                            }
                            else {
                                res.render("../views/home", {
                                    username: Object.values(selectResult[0]),
                                    rows: taskResult,
                                    moment,
                                    row: finishedResult
                                });
                            }
                        })
                    }
                })
            }
        })
    }
})

module.exports = router