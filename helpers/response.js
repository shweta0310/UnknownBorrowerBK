module.exports.response = function (res, error, data, message, statusCode) {
    let response = {};
    error && (response.error = error.message);
    data && (response.data = data);
    message && (response.message = message);
    (Object.keys(response).length === 0) && (response.data = null)
    return res.status(statusCode).json(response);
};
