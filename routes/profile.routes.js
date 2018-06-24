var config = require('../config/apiConfig');
var request = require('request');
var fs = require('fs');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
    request.get(process.env.API_URL + '/user/' + req.session.user.id, function(err, response, body){
        if(err || response.statusCode == 404){
            res.render('pages/errors/500');
            return;
        }      

        var user = JSON.parse(body);
        var message = req.session.message;

        req.session.message = '';

        res.render('pages/profile/profile', {
            user: user,
            message: message
        });
    });
});

router.post('/', function(req, res){

    if(req.files && req.files.photo && req.files.photo.name){
        var file = req.files.photo.path;
        var bitmap = fs.readFileSync(file);
        var base64Image = new Buffer(bitmap).toString('base64');
        
        req.body.image = base64Image;
    }

    req.body.company = req.session.company.id;
    req.body.initials = getInitials(req.body.name);
    console.log(req.body.initials);

    var options = {
        url: process.env.API_URL + '/user/' + req.session.user.id,
        method: 'PUT',
        json: req.body
    }

    request(options, function(err, response, body){
        if(err){
            res.render('pages/errors/500');
            return;
        }

        var message = '';

        if(response.statusCode == 404 || response.statusCode == 500){
            message = {
                type: 'error',
                title: 'Ops! ', 
                message: 'Erro ao atualizar os dados do perfil.'
            }
        }else{
            message = {
                type: 'success',
                title: 'Ok! ', 
                message: 'Perfil atualizado com sucesso.' 
            };
        }

        req.session.message = message;
        res.redirect('/profile');
    });
});

router.post('/change-password', function(req, res){

    req.body.company = req.session.company.id;

    var options = {
        url: process.env.API_URL + '/user/' + req.session.user.id,
        method: 'PUT',
        json: req.body
    }

    request(options, function(err, response, body){
        if(err){
            res.render('pages/errors/500');
            return;
        }

        var message = '';

        if(response.statusCode == 404 || response.statusCode == 500){
            message = {
                type: 'error',
                title: 'Ops! ', 
                message: 'Erro ao atualizar a senha.'
            }
        }else{
            message = {
                type: 'success',
                title: 'Ok! ', 
                message: 'Senha atualizada com sucesso.' 
            };
        }

        req.session.message = message;
        res.redirect('/profile');
    });
});

function getInitials(name){
    var names = name.split(" ");
    
    if(names.length > 0){
        var firstNameLetter = names[0].substring(0,1);
        var lastNameLetter = (names.length > 1) ? names[names.length-1].substring(0,1) : '';
    }

    return firstNameLetter + lastNameLetter;
}

module.exports = router;