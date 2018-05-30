require('dotenv').config();
const PORT = process.env.PORT || 8080;

var express = require('express');
var app = express();
var routerProvider = require('./config/routesProvider');

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/views'));

routerProvider.routes(app);

app.listen(PORT, function(){
    console.log('Server is listening on port ' + PORT);
})