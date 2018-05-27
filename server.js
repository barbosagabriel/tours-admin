require('dotenv').config();
const PORT = process.env.PORT || 8080;

var express = require('express');
var app = express();
var router = express.Router();

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/views'));

//TODO: Refactor routes to a file
router.get('/', function(req, res){
    res.render('index');
})

router.use("*", function(req, res) {
    res.send('404 Not Found');
});

app.use('/', router);

app.listen(PORT, function(){
    console.log('Server is listening on port ' + PORT);
})