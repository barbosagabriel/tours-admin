var request = require('request');

var CompanyController = function(){

    function _getCompany(id, req, res){
        request.get(process.env.API_URL + '/company/' + id, function(err, response, body){
            if(err || response.statusCode == 404){
                res.render('pages/errors/500');
                return;
            }      
    
            var company = JSON.parse(body);
            var message = req.session.message;
    
            req.session.message = '';
    
            res.render('pages/company/company', {
                company: company,
                message: message
            });
        });
    }

    function _updateCompany(id, req, res){
        var options = {
            url: process.env.API_URL + '/company/' + id,
            method: 'PUT',
            json: req.body
        }
    
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
                    message: 'Erro ao atualizar os dados da Empresa.'
                }
            }else{
                message = {
                    type: 'success',
                    title: 'Ok! ', 
                    message: 'Empresa atualizada com sucesso.' 
                };
            }
    
            req.session.message = message;
            res.redirect('/company');
        });
    }

    return {
        getCompany: _getCompany,
        updateCompany: _updateCompany
    }

}();

module.exports = CompanyController;