var request = require("request");

var ServiceService = (function() {
  function _findAll(companyId) {
    return new Promise(function(resolve, reject) {
      request.get(
        process.env.API_URL + "/service/company/" + companyId,
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
    findAll: _findAll
  };
})();

module.exports = ServiceService;
