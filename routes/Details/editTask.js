const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const moment = require('moment');
const router = express.Router();
const database = require('../../controller/database');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get('/', async (req, res) => {
    if (!req.session.loggedin) {
        res.redirect('/')
    }
    else {
        database.database.query('SELECT username FROM users WHERE username = ?', req.session.username, function (selectErr, selectResult) {
            if (!req.session.loggedin) {
                res.redirect('/');
            }
            else {
                database.database.query('SELECT * FROM tasks WHERE taskID = ?', req.query.id, function (queryErr, queryResult) {
                    res.render('../views/Details/editTask', {
                        username: Object.values(selectResult[0]),
                        rowResult: queryResult[0]
                    })
                })
            }
        })
    }
})

router.post('/', async (req, res) => {
    const { taskTitle, taskDescription } = req.body;

    let ts = Date.now();
    let date_ob = new Date(ts);
    let date = date_ob.getDate();
    let month = date_ob.getMonth() + 1;
    let year = date_ob.getFullYear();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    let seconds = date_ob.getSeconds();

    let fullDate = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;

    database.database.query('SELECT firstname, username FROM users WHERE username = ?', req.session.username, function (selectErr, selectResult) {
        if (selectErr) {
            throw selectErr;
        }
        else {
            const user = selectResult[0].firstname;

            database.database.query('UPDATE tasks SET taskTitle = ?, taskDescription = ?, taskUser = ?, taskDate = ?, taskStatus = "Добавено" WHERE taskID = ?', [taskTitle, taskDescription, user, fullDate, req.body.taskID], function (insertError, insertResult) {
                if (insertError) {
                    throw insertError;
                }
                else {
                    res.redirect('/home')
                }
            })
        }
    })

});

module.exports = router;