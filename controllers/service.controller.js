var request = require('request');

var ServiceController = function(){

    function _create(req, res){
        req.body.company = req.session.company.id;
        delete(req.body.id);
    
        var options = {
            json: req.body,
            url: process.env.API_URL + '/service',
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
                message: 'Serviço cadastrado com sucesso.' 
            };
    
            req.session.message = message;
            res.redirect('/service/' + body._id + '/edit');
        });
    }

    function _findAll(companyId, req, res){
        request.get(process.env.API_URL + '/service/company/' + companyId, function(err, response, body){
            if(err){
                res.render('pages/errors/500');
            }
    
            var message = req.session.message;
            req.session.message = '';
    
            res.render('pages/service/services', {
                services: JSON.parse(body),
                message: message
            });
        });
    }

    function _findOne(id, req, res){
        request.get(process.env.API_URL + '/service/' + id , function(err, response, body){
            if(err){
                res.render('pages/errors/500');
            }
    
            var service = JSON.parse(body);
            
            if(body.message != undefined){
                res.render('pages/errors/404');
            }
            
            var message = req.session.message;
            req.session.message = '';
    
            res.render('pages/service/service', {
                service: service,
                message: message
            });
    
        });
    }
    
    function _update(id, req, res){
        req.body.company = req.session.company.id;
        
        var options = {
            json: req.body,
            url: process.env.API_URL + '/service/' + id,
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
                    message: 'Erro ao atualizar o Serviço.' 
                };
            }else{
                message = {
                    type: 'success',
                    title: 'Ok! ', 
                    message: 'Serviço atualizado com sucesso.' 
                };
            }
            
            req.session.message = message;
            res.redirect('/service/' + id + '/edit');
        });
    }

    function _remove(id, req, res){
        request.delete(process.env.API_URL + '/service/' + id , function(err, response, body){
            if(err){
                res.render('pages/errors/500');
            }
    
            if(body.message != undefined){
                res.render('pages/errors/404');
            }

            var message = {
                type: 'success',
                title: 'Ok! ', 
                message: 'Serviço excluído com sucesso.' 
            };
    
            req.session.message = message;
            res.redirect('/service/list');
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

module.exports = ServiceController;