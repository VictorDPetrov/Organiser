const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const moment = require('moment');
const router = express.Router();
const database = require('../../controller/database');


router.get('/', async (req, res) => {
    database.database.query("DELETE FROM tasks WHERE taskID = ?", req.query.id, function (err, result) {
        if (err) {
            res.sendStatus(500);
        }
        else {
            res.redirect('/home');
        }
    })
})

module.exports = router;