var config = require('../config/apiConfig');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
    res.render('pages/index', {
        api_url: config.API_URL
    });
})

module.exports = router;