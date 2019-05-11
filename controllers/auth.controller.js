var request = require("request");
var dashboardController = require("../controllers/dashboard.controller");

var AuthController = (function() {
  function _login(req, res) {
    var options = {
      url: process.env.API_URL + "/auth/login",
      method: "POST",
      json: {
        email: req.body.email,
        password: req.body.password
      }
    };

    request(options, function(err, response, body) {
      if (err) {
        res.render("pages/errors/500");
        return;
      }

      if (response.statusCode == 400) {
        res.render("pages/auth/login", {
          error: {
            title: "Erro:",
            message: "Dados inválidos."
          }
        });
        return;
      } else if (response.statusCode == 404) {
        res.render("pages/auth/login", {
          error: {
            title: "Erro:",
            message: "Usuário e/ou senha inválidos."
          }
        });
        return;
      }

      req.session.user = {};
      req.session.user.authenticated = true;
      req.session.user.id = body._id;
      req.session.user.name = body.name;
      req.session.user.initials = body.initials;
      req.session.company = {};
      req.session.company.id = body.company;

      dashboardController.getData(req, res);
    });
  }

  return {
    login: _login
  };
})();

module.exports = AuthController;
