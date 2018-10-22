var express = require('express');
var router = express.Router();
var DashboardController = require('../controllers/dashboard.controller');

router.get('/', function(req, res){
    DashboardController.getData(req, res);
});

module.exports = router;