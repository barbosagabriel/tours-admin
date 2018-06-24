var config = require('../config/apiConfig');
var request = require('request');
var express = require('express');
var router = express.Router();

router.get('/login', function(req, res){
    if(req.session.user && req.session.user.authenticated){
        res.redirect('/');
    }
    
    res.render('pages/auth/login', {error: ''});
});

router.post('/login', function(req, res){
    var options = {
        url: process.env.API_URL + '/auth/login',
        method: 'POST',
        json: {
            email: req.body.email,
            password: req.body.password
        }
    }

    request(options, function(err, response, body){
        if(err){
            res.render('pages/errors/500');
            return;
        }

        if(response.statusCode == 400){
            res.render("pages/auth/login", {
                error: { 
                    title: "Erro:", 
                    message: "Dados inválidos." }
                });
            return;
        }else if(response.statusCode == 404){
            res.render("pages/auth/login", {
                error: { 
                    title: "Erro:", 
                    message: "Usuário e/ou senha inválidos." }
                });
            return;
        }

        req.session.user = {};
        req.session.user.authenticated = true;
        req.session.user.id = body._id;
        req.session.user.name = body.name;
        req.session.user.initials = body.initials;
        req.session.company = {};
        req.session.company.id = body.company;

        res.render('pages/index', {
            user: { 
                name: req.session.user.name,
                initials: req.session.user.initials
            }
        });
    });
});

router.get('/forgot-password', function(req, res){
    res.render('pages/auth/forgot-password');    
});

router.get('/logout', function(req, res){
    req.session.destroy();
    res.render('pages/auth/login', {
        alert: { 
            title: "", 
            message: "Usuário desconectado." }
        });    
});

module.exports = router;