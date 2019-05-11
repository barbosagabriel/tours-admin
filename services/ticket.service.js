var request = require("request");

var TicketService = (function() {
  function _findOne(ticketId) {
    return new Promise(function(resolve, reject) {
      request.get(process.env.API_URL + "/ticket/" + ticketId, function(
        err,
        response,
        body
      ) {
        if (err) {
          reject(err);
        }
        resolve(JSON.parse(body));
      });
    });
  }

  function _findAll(companyId) {
    return new Promise(function(resolve, reject) {
      request.get(
        process.env.API_URL + "/ticket/company/" + companyId,
        function(err, response, body) {
          if (err) {
            reject(err);
          }
          resolve(JSON.parse(body));
        }
      );
    });
  }

  return {
    findAll: _findAll,
    findOne: _findOne
  };
})();

module.exports = TicketService;
