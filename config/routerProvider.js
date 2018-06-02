var homeRoutes = require('../routes/home.routes.js');
var errorsRoutes = require('../routes/errors.routes.js');
var companyRoutes = require('../routes/company.routes.js');

module.exports = (function(){

    var _routes = function(app){
        app.use('/', homeRoutes);
        app.use('/company', companyRoutes);
        
        app.use('/', errorsRoutes);
    }

    return {
        routes: _routes
    }
    
})();