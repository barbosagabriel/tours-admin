var profileController = require('../controllers/profile.controller');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
    profileController.findOne(req.session.user.id, req, res);
});

router.post('/', function(req, res){
    profileController.update(req.session.user.id, req, res);
});

router.post('/change-password', function(req, res){
    profileController.updatePassword(req.session.user.id, req, res);
});

module.exports = router;