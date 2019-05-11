var ticketController = require("../controllers/ticket.controller");
var customerController = require("../controllers/customer.controller");
var customerService = require("./../services/customer.service");
var serviceService = require("./../services/service.service");
var express = require("express");
var router = express.Router();

router.get("/list", function(req, res) {
  ticketController.findAll(req.session.company.id, req, res);
});

router.post("/", function(req, res) {
  var id = req.body.id;

  if (!id) {
    ticketController.create(req, res);
  } else {
    ticketController.update(id, req, res);
  }
});

router.get("/create", function(req, res) {
  var findCustomers = customerService.findAll(req.session.company.id);
  var findServices = serviceService.findAll(req.session.company.id);
  Promise.all([findCustomers, findServices])
    .then(function(result) {
      res.render("pages/ticket/ticket", {
        ticket: {},
        customers: result[0],
        services: result[1]
      });
    })
    .catch(function(err) {
      res.render("pages/errors/500");
    });
});

router.get("/:id/edit", function(req, res) {
  ticketController.findOne(req.params.id, req, res);
});

router.get("/:id/delete", function(req, res) {
  ticketController.remove(req.params.id, req, res);
});

router.get("/:id/download", function(req, res) {
  ticketController.download(req.params.id, req, res);
});

module.exports = router;
