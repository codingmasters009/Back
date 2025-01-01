const generateIdn = require("../utils/generateIdn");

/**
 * Middleware to add a dynamically generated IDN to the request body.
 */
const UAE= 1100 

const addIdnToRequest = (req, res, next) => {
  const { countryCode = UAE , stateCode = "100" } = req.body;

  // Generate a random user-specific code
  const userCode = Math.floor(1000000 + Math.random() * 1000000).toString();

  // Generate the IDN
  req.body.idn = generateIdn(countryCode, stateCode, userCode);

  next();
};

module.exports = addIdnToRequest;
