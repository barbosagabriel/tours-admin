var customerController = require('../controllers/customer.controller');
var express = require('express');
var router = express.Router();

router.get('/list', function(req, res){
    customerController.findAll(req.session.company.id, req, res);
});

router.post('/', function(req, res){
    var id = req.body.id;
    
    if(!id){
        customerController.create(req, res);
    }else{
        customerController.update(id, req, res);
    }
});

router.get('/create', function(req, res){
    res.render('pages/customer/customer', {
        customer: {}
    });
});

router.get('/:id/edit', function(req, res){
    customerController.findOne(req.params.id, req, res);
});

router.get('/:id/delete', function(req, res){
    customerController.remove(req.params.id, req, res);
});

module.exports = router;