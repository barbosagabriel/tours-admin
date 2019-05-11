var request = require("request");

var ProfileController = (function() {
  function _findOne(id, req, res) {
    request.get(process.env.API_URL + "/user/" + id, function(
      err,
      response,
      body
    ) {
      if (err || response.statusCode == 404) {
        res.render("pages/errors/500");
        return;
      }

      var user = JSON.parse(body);
      var message = req.session.message;

      req.session.message = "";

      res.render("pages/profile/profile", {
        user: user,
        message: message
      });
    });
  }

  function _update(id, req, res) {
    req.body.company = req.session.company.id;

    var options = {
      url: process.env.API_URL + "/user/" + id,
      method: "PUT",
      json: req.body
    };

    request(options, function(err, response, body) {
      if (err) {
        res.render("pages/errors/500");
        return;
      }

      var message = "";

      if (response.statusCode == 404 || response.statusCode == 500) {
        message = {
          type: "error",
          title: "Ops! ",
          message: "Erro ao atualizar os dados do perfil."
        };
      } else {
        message = {
          type: "success",
          title: "Ok! ",
          message: "Perfil atualizado com sucesso."
        };
      }

      req.session.message = message;
      res.redirect("/profile");
    });
  }

  function _updatePassword(id, req, res) {
    req.body.company = req.session.company.id;

    var options = {
      url: process.env.API_URL + "/user/" + id,
      method: "PUT",
      json: req.body
    };

    request(options, function(err, response, body) {
      if (err) {
        res.render("pages/errors/500");
        return;
      }

      var message = "";

      if (response.statusCode == 404 || response.statusCode == 500) {
        message = {
          type: "error",
          title: "Ops! ",
          message: "Erro ao atualizar a senha."
        };
      } else {
        message = {
          type: "success",
          title: "Ok! ",
          message: "Senha atualizada com sucesso."
        };
      }

      req.session.message = message;
      res.redirect("/profile");
    });
  }

  return {
    findOne: _findOne,
    update: _update,
    updatePassword: _updatePassword
  };
})();

module.exports = ProfileController;
