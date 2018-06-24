var serviceController = require('../controllers/service.controller');
var express = require('express');
var router = express.Router();

router.get('/list', function(req, res){
    serviceController.findAll(req.session.company.id, req, res);
});

router.post('/', function(req, res){
    var id = req.body.id;
    
    if(!id){
        serviceController.create(req, res);
    }else{
        serviceController.update(id, req, res);
    }
});

router.get('/create', function(req, res){
    res.render('pages/service/service', {
        service: {}
    });
});

router.get('/:id/edit', function(req, res){
    serviceController.findOne(req.params.id, req, res);
});

router.get('/:id/delete', function(req, res){
    serviceController.remove(req.params.id, req, res);
});

module.exports = router;