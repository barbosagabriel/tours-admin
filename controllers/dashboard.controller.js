var DashboardService = require('../services/dashboard.service');

var AuthController = function(){

    function _getData(req, res){
        Promise.all([DashboardService.getCustomersCount(req.session.company.id), 
        DashboardService.getCustomersCreatedThisMonth(req.session.company.id), 
        DashboardService.getCustomersMonthGoal(req.session.company.id), 
        DashboardService.getServicesCount(req.session.company.id),
        DashboardService.getTicketsThisMonth(req.session.company.id), 
        DashboardService.getTicketsMonthGoal(req.session.company.id),
        DashboardService.getNextTickets(req.session.company.id)])
            .then(function(values){

                var data = {
                    customers: values[0],
                    customersThisMonth: values[1],
                    customersPercentual: (values[1]/values[2] * 100).toFixed(1),
                    customersGoal: values[2],
                    services: values[3],
                    ticketsThisMonth: values[4],
                    ticketsGoal: values[5],
                    ticketsPercentual: (values[4]/values[5] * 100).toFixed(1),
                    nextTickets: values[6]
                };

                if(req.session.user.name && req.session.user.initials){
                    data.user = {
                        name: req.session.user.name,
                        initials: req.session.user.initials
                    }
                }

                res.render('pages/index', data);
            })
            .catch(function(error){
                res.render('pages/errors/500');
            });
    }

    return{
        getData: _getData
    }
}();

module.exports = AuthController;