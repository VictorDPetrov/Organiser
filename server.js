const express = require('express');
const app = express();
const port = 1314;

app.get('/', (req, res) => {
    res.send("Welcome to Jar Vidin's Organiser!");
})

app.listen(port, (req, res) => {
    console.log(`Organiser is on port ${port}`)
})