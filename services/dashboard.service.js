var request = require('request');

var DashboardService = function(){

    function _getCustomersCount(companyId){

        return new Promise(function(resolve, reject){
            request.get(process.env.API_URL + '/dashboard/customers/count/' + companyId, function(err, response, body){
                if(err){
                    reject(err);
                }
        
                resolve(JSON.parse(body).total);
            });
        });
    }

    function _getCustomersCreatedThisMonth(companyId){

        return new Promise(function(resolve, reject){
            request.get(process.env.API_URL + '/dashboard/customers/thisMonth/' + companyId, function(err, response, body){
                if(err){
                    reject(err);
                }
        
                resolve(JSON.parse(body).total);
            });
        });
    }

    function _getServicesCount(companyId){

        return new Promise(function(resolve, reject){
            request.get(process.env.API_URL + '/dashboard/services/count/' + companyId, function(err, response, body){
                if(err){
                    reject(err);
                }
        
                resolve(JSON.parse(body).total);
            });
        });
    }

    function _getTicketsThisMonth(companyId){

        return new Promise(function(resolve, reject){
            request.get(process.env.API_URL + '/dashboard/tickets/thisMonth/' + companyId, function(err, response, body){
                if(err){
                    reject(err);
                }
        
                resolve(JSON.parse(body).total);
            });
        });
    }

    function _getNextTickets(companyId){

        return new Promise(function(resolve, reject){
            request.get(process.env.API_URL + '/dashboard/tickets/nextTickets/' + companyId, function(err, response, body){
                if(err){
                    reject(err);
                }
        
                resolve(JSON.parse(body).data);
            });
        });
    }

    function _getTicketsMonthGoal(companyId){

        return new Promise(function(resolve, reject){
            request.get(process.env.API_URL + '/dashboard/tickets/monthGoal/' + companyId, function(err, response, body){
                if(err){
                    reject(err);
                }
        
                resolve(JSON.parse(body).total);
            });
        });
    }
    
    function _getCustomersMonthGoal(companyId){

        return new Promise(function(resolve, reject){
            request.get(process.env.API_URL + '/dashboard/customers/monthGoal/' + companyId, function(err, response, body){
                if(err){
                    reject(err);
                }
        
                resolve(JSON.parse(body).total);
            });
        });
    }

    return {
        getCustomersCount: _getCustomersCount,
        getCustomersCreatedThisMonth: _getCustomersCreatedThisMonth,
        getCustomersMonthGoal: _getCustomersMonthGoal,
        getServicesCount: _getServicesCount,
        getTicketsThisMonth: _getTicketsThisMonth,
        getTicketsMonthGoal: _getTicketsMonthGoal,
        getNextTickets: _getNextTickets,
    }

}();

module.exports = DashboardService;