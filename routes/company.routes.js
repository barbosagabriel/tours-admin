var companyController = require('../controllers/company.controller');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
    companyController.getCompany(req.session.company.id, req, res);
});

router.post('/', function(req, res){
    companyController.updateCompany(req.session.company.id, req, res);
});

module.exports = router;