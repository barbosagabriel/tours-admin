var request = require('request');
var customerService = require('./../services/customer.service');
var serviceService = require('./../services/service.service');
var ticketService = require('./../services/ticket.service');

var TicketController = function(){

    function _create(req, res){
        req.body.company = req.session.company.id;
        delete(req.body.id);
    
        var options = {
            json: req.body,
            url: process.env.API_URL + '/ticket',
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
                message: 'Reserva cadastrada com sucesso.' 
            };
    
            req.session.message = message;
            res.redirect('/ticket/' + body._id + '/edit');
        });
    }

    function _findAll(companyId, req, res){
        request.get(process.env.API_URL + '/ticket/company/' + companyId, function(err, response, body){
            if(err){
                res.render('pages/errors/500');
            }
    
            var message = req.session.message;
            req.session.message = '';
    
            res.render('pages/ticket/tickets', {
                tickets: JSON.parse(body),
                message: message
            });
        });
    }

    function _findOne(id, req, res){

        var findTicket = ticketService.findOne(id);
        var findCustomers = customerService.findAll(req.session.company.id);
        var findServices = serviceService.findAll(req.session.company.id)
        Promise.all([findTicket, findCustomers, findServices])
            .then(function(result){
                var ticket = result[0];
                ticket.date = new Date(ticket.date);

                res.render('pages/ticket/ticket', {
                        ticket: ticket,
                        customers: result[1],
                        services: result[2]
                    });
            })
            .catch(function(err){
                res.render('pages/errors/500');
            });


        // request.get(process.env.API_URL + '/ticket/' + id , function(err, response, body){
        //     if(err){
        //         res.render('pages/errors/500');
        //     }
    
        //     var ticket = JSON.parse(body);
            
        //     if(body.message != undefined){
        //         res.render('pages/errors/404');
        //     }
            
        //     var message = req.session.message;
        //     req.session.message = '';
    
        //     res.render('pages/ticket/ticket', {
        //         ticket: ticket,
        //         message: message
        //     });
    
        // });
    }
    
    function _update(id, req, res){
        req.body.company = req.session.company.id;
        
        var options = {
            json: req.body,
            url: process.env.API_URL + '/ticket/' + id,
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
                    message: 'Erro ao atualizar a Reserva.' 
                };
            }else{
                message = {
                    type: 'success',
                    title: 'Ok! ', 
                    message: 'Reserva atualizada com sucesso.' 
                };
            }
            
            req.session.message = message;
            res.redirect('/ticket/' + id + '/edit');
        });
    }

    function _remove(id, req, res){
        request.delete(process.env.API_URL + '/ticket/' + id , function(err, response, body){
            if(err){
                res.render('pages/errors/500');
            }
    
            if(body.message != undefined){
                res.render('pages/errors/404');
            }

            var message = {
                type: 'success',
                title: 'Ok! ', 
                message: 'Reserva excluída com sucesso.' 
            };
    
            req.session.message = message;
            res.redirect('/ticket/list');
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

module.exports = TicketController;