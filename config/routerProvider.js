var homeRoutes = require('../routes/home.routes.js');
var errorsRoutes = require('../routes/errors.routes.js');
var companyRoutes = require('../routes/company.routes.js');
var customerRoutes = require('../routes/customer.routes.js');
var authRoutes = require('../routes/auth.routes.js');

module.exports = (function(){

    function isUserAuthenticated(req, res, next){
        if((req.session.user && req.session.user.authenticated) || req.path == '/login')
            return next();
    
        res.render('pages/auth/login');
    }

    var _routes = function(app){        
        app.all('*', isUserAuthenticated);
        app.use('/', homeRoutes);
        app.use('/company', companyRoutes);
        app.use('/customer', customerRoutes);
        app.use('/', authRoutes);
        app.use('/', errorsRoutes);
    }

    return {
        routes: _routes
    }
    
})();