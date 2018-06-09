var express = require('express');
var router = express.Router();

router.use("*", function(req, res) {
    res.render('pages/errors/404');
});

module.exports = router;