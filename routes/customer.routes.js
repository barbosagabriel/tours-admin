var config = require('../config/apiConfig');
var request = require('request');
var express = require('express');
var router = express.Router();

router.get('/list', function(req, res){
    request.get(process.env.API_URL + '/customer/company/' + req.session.company.id, function(err, response, body){
        if(err){
            res.render('pages/errors/500');
        }

        var message = req.session.message;
        req.session.message = '';

        res.render('pages/customer/customers', {
            customers: JSON.parse(body),
            message: message
        });
    });    
});

router.post('/', function(req, res){
    var id = req.body.id;
    req.body.company = req.session.company.id;
    
    var options = {
        json: req.body
    };
    
    if(!id){
        options.url = process.env.API_URL + '/customer';
        options.method = 'POST';
        delete(options.json.id);
        createCompany(req, res, options);
    }else{
        options.url = process.env.API_URL + '/customer/' + id,
        options.method = 'PUT',
        updateCompany(req, res, options, id);
    }
});

function createCompany(req, res, options){
    request(options, function(err, response, body){
        if(err){
            res.render('pages/errors/500');
            return;
        }

        var message = {
            type: 'success',
            title: 'Ok! ', 
            message: 'Cliente cadastrado com sucesso.' 
        };

        req.session.message = message;
        res.redirect('/customer/' + body._id + '/edit');
    });
}

function updateCompany(req, res, options, id){
    request(options, function(err, response, body){
        if(err){
            res.render('pages/errors/500');
            return;
        }

        var message = '';
        
        if(response.statusCode == 404){
            message = {
                type: 'error',
                title: 'Ops! ', 
                message: 'Erro ao atualizar o Cliente.' 
            };
        }else{
            message = {
                type: 'success',
                title: 'Ok! ', 
                message: 'Cliente atualizado com sucesso.' 
            };
        }

        req.session.message = message;
        res.redirect('/customer/' + id + '/edit');
    });
}

router.get('/create', function(req, res){
    res.render('pages/customer/customer', {
        customer: {}
    });
});

router.get('/:id/edit', function(req, res){
    request.get(process.env.API_URL + '/customer/' + req.params.id , function(err, response, body){
        if(err){
            res.render('pages/errors/500');
        }

        var customer = JSON.parse(body);
        
        if(body.message != undefined){
            res.render('pages/errors/404');
        }
        
        var message = req.session.message;
        req.session.message = '';

        res.render('pages/customer/customer', {
            customer: customer,
            message: message
        });

    });
});

router.get('/:id/delete', function(req, res){
    request.delete(process.env.API_URL + '/customer/' + req.params.id , function(err, response, body){
        if(err){
            res.render('pages/errors/500');
        }

        if(body.message != undefined){
            res.render('pages/errors/404');
        }

        res.redirect('/customer/list');
    });
});

module.exports = router;