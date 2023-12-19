const express = require('express');
const database = require('../../controller/database');
const router = express.Router();
const moment = require('moment');
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

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
                res.render("../views/Add/addTask", {
                    username: Object.values(selectResult[0]),
                    moment
                });
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

    database.database.query('SELECT firstName, username FROM users WHERE username = ?', req.session.username, function (selectErr, selectResult) {
        if (selectErr) {
            throw selectErr;
        }
        else {
            const user = selectResult[0].firstName;
            
            database.database.query("INSERT INTO tasks (taskTitle, taskDescription, taskUser, taskDate, taskStatus) VALUES (?, ?, ?, ?, ?)", [taskTitle, taskDescription, user, fullDate, "Добавено"], function (insertErr, insertResult) {
                if (insertErr) {
                    throw insertErr;
                }
                else {
                    res.redirect('/home')
                }
            })
        }
    })
})

module.exports = router