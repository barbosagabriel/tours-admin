var authController = require('../controllers/auth.controller');
var dashboardController = require('../controllers/dashboard.controller');
var express = require('express');
var router = express.Router();


router.get('/login', function(req, res){
    if(req.session.user && req.session.user.authenticated){
        dashboardController.getData(req, res);
    }
    
    res.render('pages/auth/login', {error: ''});
});

router.post('/login', function(req, res){
    authController.login(req, res);
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