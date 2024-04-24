const getMessage = require("../lang/en/messages");

const RESPONSE = {};

RESPONSE.success = function (
    res,
    messageCode = null,
    data = null,
    statusCode = 200
) {
    let response = {};
    response.success = true;
    response.message = getMessage(messageCode);
    if (data != null) {
        response.data = data;
    }
    return res.status(statusCode).send(response);
};
RESPONSE.error = function (
    res,
    messageCode = null,
    error = null,
    statusCode = 400,
) {
    let response = {};
    response.success = false;
    response.message = getMessage(messageCode);
    statusCode = messageCode == 9999 ? 500 : statusCode;

    if (error != null) {
        console.log('error :>> ', error);
        response.message = error;
    }
    return res.status(statusCode).send(response);
};

// exporting RESPONSE
module.exports = RESPONSE;