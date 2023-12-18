const express = require('express');
const session = require('express-session');
const app = express();
const port = 1314;
const bodyParser = require('body-parser');

const sessionSecret = "t769cUAs331ztN8X0tpEFIR8XDSXDLoR";
const cookieExpires = 1000 * 60 * 60;

const loginRoute = require('./routes/login');
const homeRoute = require('./routes/home');
const logoutRoute = require('./routes/logout');

app.use(express.static('views'));
app.use(express.static('controller'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('view engine', 'ejs');

// Session
app.use(session({
    secret: sessionSecret,
    name: 'userSession',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: cookieExpires,
        httpOnly: true
    },
}));

// Updating cookie time before expiring (60 minutes)
app.use(function (req, res, next) {
    req.session._garbage = Date();
    req.session.touch();
    next();
});

app.use('/', loginRoute);
app.use('/home', homeRoute);
app.use('/logout', logoutRoute);

app.listen(port, (req, res) => {
    console.log(`Organiser is on port ${port}`);
})