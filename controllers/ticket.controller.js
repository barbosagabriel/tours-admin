var request = require("request");
var moment = require("moment");

var customerService = require("./../services/customer.service");
var serviceService = require("./../services/service.service");
var ticketService = require("./../services/ticket.service");

var TicketController = (function() {
  function _create(req, res) {
    req.body.company = req.session.company.id;
    delete req.body.id;

    var date = moment(req.body.date, "DD/MM/yyyy hh:mm").format();
    delete req.body.date;
    req.body.date = date;

    var options = {
      json: req.body,
      url: process.env.API_URL + "/ticket",
      method: "POST"
    };

    request(options, function(err, response, body) {
      if (err) {
        res.render("pages/errors/500");
        return;
      }

      var message = {
        type: "success",
        title: "Ok! ",
        message: "Reserva cadastrada com sucesso."
      };

      req.session.message = message;
      res.redirect("/ticket/" + body._id + "/edit");
    });
  }

  function _findAll(companyId, req, res) {
    request.get(process.env.API_URL + "/ticket/company/" + companyId, function(
      err,
      response,
      body
    ) {
      if (err) {
        res.render("pages/errors/500");
      }

      var message = req.session.message;
      req.session.message = "";

      var tickets = JSON.parse(body);
      var tickets2 = tickets.map(t =>
        Object.assign(t, {
          formattedDate: moment(t.date).format("DD/MM/YYYY HH:mm")
        })
      );

      res.render("pages/ticket/tickets", {
        tickets: tickets2,
        message: message
      });
    });
  }

  function _findOne(id, req, res) {
    var findTicket = ticketService.findOne(id);
    var findCustomers = customerService.findAll(req.session.company.id);
    var findServices = serviceService.findAll(req.session.company.id);
    Promise.all([findTicket, findCustomers, findServices])
      .then(function(result) {
        var ticket = result[0];
        var date = moment(new Date(ticket.date)).format("DD/MM/YYYY HH:mm");
        delete ticket.date;
        ticket.date = date;

        res.render("pages/ticket/ticket", {
          ticket: ticket,
          customers: result[1],
          services: result[2]
        });
      })
      .catch(function(err) {
        res.render("pages/errors/500");
      });
  }

  function _update(id, req, res) {
    req.body.company = req.session.company.id;

    var date = moment(req.body.date, "DD/MM/YYYY hh:mm").format();
    delete req.body.date;
    req.body.date = date;

    var options = {
      json: req.body,
      url: process.env.API_URL + "/ticket/" + id,
      method: "PUT"
    };

    request(options, function(err, response, body) {
      if (err) {
        res.render("pages/errors/500");
        return;
      }

      var message = "";

      if (response.statusCode == 404) {
        message = {
          type: "error",
          title: "Ops! ",
          message: "Erro ao atualizar a Reserva."
        };
      } else {
        message = {
          type: "success",
          title: "Ok! ",
          message: "Reserva atualizada com sucesso."
        };
      }

      req.session.message = message;
      res.redirect("/ticket/" + id + "/edit");
    });
  }

  function _remove(id, req, res) {
    request.delete(process.env.API_URL + "/ticket/" + id, function(
      err,
      response,
      body
    ) {
      if (err) {
        res.render("pages/errors/500");
      }

      if (body.message != undefined) {
        res.render("pages/errors/404");
      }

      var message = {
        type: "success",
        title: "Ok! ",
        message: "Reserva excluída com sucesso."
      };

      req.session.message = message;
      res.redirect("/ticket/list");
    });
  }

  function _download(id, req, res) {
    request.get(process.env.API_URL + "/ticket/" + id + "/pdf", function(
      err,
      response,
      body
    ) {
      if (err || response.statusCode == 400) {
        res.render("pages/errors/500");
        return;
      }

      var jsonBody = JSON.parse(body);

      res.setHeader(
        "Content-disposition",
        "attachment; filename=" + jsonBody.filename
      );
      res.setHeader("Content-Type", "application/pdf");
      res.send(new Buffer(jsonBody.file, "base64"));
    });
  }

  return {
    create: _create,
    findAll: _findAll,
    findOne: _findOne,
    download: _download,
    update: _update,
    remove: _remove
  };
})();

module.exports = TicketController;
