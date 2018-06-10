var config = require('../config/apiConfig');
var request = require('request');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
    request.get(process.env.API_URL + '/customer', function(err, response, data){
        if(err){
            res.render('pages/errors/500');
        }
        res.render('pages/customer/customers', {
            customers: JSON.parse(data)
        });
    });    
});

router.get('/create', function(req, res){
    res.render('pages/customer/customer', {
        api_url: config.API_URL,
        customer: {}
    });
});

router.get('/:id/edit', function(req, res){
    request.get(process.env.API_URL + '/customer/' + req.params.id , function(err, response, data){
        if(err){
            res.render('pages/errors/500');
        }

        var data = JSON.parse(data);
        
        if(data.message != undefined){
            res.render('pages/errors/404');
        }
        
        res.render('pages/customer/customer', {
            customer: data,
            api_url: config.API_URL
        });

    });
});

router.get('/:id/delete', function(req, res){
    request.delete(process.env.API_URL + '/customer/' + req.params.id , function(err, response, data){
        if(err){
            res.render('pages/errors/500');
        }

        if(data.message != undefined){
            res.render('pages/errors/404');
        }

        res.redirect('/customers');
    });
});

module.exports = router;