require('dotenv').config();
const PORT = process.env.PORT || 8080;

var express = require('express');
var bodyParser = require("body-parser");
var session = require('express-session');
var multiparty = require('connect-multiparty');
var routerProvider = require('./config/routerProvider');

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(multiparty());

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

app.set('view engine', 'ejs');
app.use('/views', express.static(__dirname + '/views'));
app.use('/assets', express.static(__dirname + '/assets'));

routerProvider.routes(app);

app.listen(PORT, function(){
    console.log('Server is listening on port ' + PORT);
})