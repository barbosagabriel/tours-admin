var config = require('../config/apiConfig');
var request = require('request');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
    request.get(process.env.API_URL + '/company/' + req.session.companyId, function(err, response, body){
        if(err){
            res.render('pages/errors/500');
            return;
        }      

        var company = JSON.parse(body);
        var message = req.session.message;

        req.session.message = '';

        res.render('pages/company/company', {
            company: company,
            message: message
        });
    });
});

router.post('/:id', function(req, res){
    var id = req.params.id;
    var options = {
        url: process.env.API_URL + '/company/' + id,
        method: 'PUT',
        json: req.body
    }

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
                message: 'Erro ao atualizar os dados da Empresa.'
            }
        }else{
            message = {
                type: 'success',
                title: 'Ok! ', 
                message: 'Empresa atualizada com sucesso.' 
            };
        }

        req.session.message = message;
        res.redirect('/company');
    });
});

module.exports = router;