var request = require('request');
var customerService = require('./../services/customer.service');

var CustomerController = function(){

    function _create(req, res){
        req.body.company = req.session.company.id;
        delete(req.body.id);
    
        var options = {
            json: req.body,
            url: process.env.API_URL + '/customer',
            method: 'POST'
        };
        
        request(options, function(err, response, body){
            if(err){
                res.render('pages/errors/500');
                return;
            }
    
            var message = {
                type: 'success',
                title: 'Ok! ', 
                message: 'Cliente cadastrado com sucesso.' 
            };
    
            req.session.message = message;
            res.redirect('/customer/' + body._id + '/edit');
        });
    }

    function _findAll(companyId, req, res){

        var message = req.session.message;
        req.session.message = '';

        customerService.findAll(companyId)
            .then(function(customers){
                res.render('pages/customer/customers', {
                    customers: customers,
                    message: message
                });
            })
            .catch(function(err){
                throw err;
            });
    }

    function _findOne(id, req, res){
        request.get(process.env.API_URL + '/customer/' + id , function(err, response, body){
            if(err){
                res.render('pages/errors/500');
            }
    
            var customer = JSON.parse(body);
            
            if(body.message != undefined){
                res.render('pages/errors/404');
            }
            
            var message = req.session.message;
            req.session.message = '';
    
            res.render('pages/customer/customer', {
                customer: customer,
                message: message
            });
    
        });
    }
    
    function _update(id, req, res){
        req.body.company = req.session.company.id;
        
        var options = {
            json: req.body,
            url: process.env.API_URL + '/customer/' + id,
            method: 'PUT'
        };
        
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
                    message: 'Erro ao atualizar o Cliente.' 
                };
            }else{
                message = {
                    type: 'success',
                    title: 'Ok! ', 
                    message: 'Cliente atualizado com sucesso.' 
                };
            }
            
            req.session.message = message;
            res.redirect('/customer/' + id + '/edit');
        });
    }

    function _remove(id, req, res){
        request.delete(process.env.API_URL + '/customer/' + id , function(err, response, body){
            if(err){
                res.render('pages/errors/500');
            }
    
            if(body.message != undefined){
                res.render('pages/errors/404');
            }
    
            var message = {
                type: 'success',
                title: 'Ok! ', 
                message: 'Cliente excluído com sucesso.' 
            };
    
            req.session.message = message;
            res.redirect('/customer/list');
        });
    }
    
    return {
        create: _create,
        findAll: _findAll,
        findOne: _findOne,
        update: _update,
        remove: _remove
    }
    
}();

module.exports = CustomerController;