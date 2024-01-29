const errorHandler = (err, req, res, next) => {
    let title = "";
    statusCode = res.statusCode;
    switch (statusCode) {
      case 400:
        title = "Validation Failed";
        break;
      case 404:
        title = "Not found";
        break;
      case 401:
        title = "Unauthorized";
        break;
      case 403:
        title = "Forbidden";
        break;
      case 500:
        title = "Server Error";
        break;
      default:
        console.log("No error");
        break;
    }
    res.json({ title: title,message: err.message, stackTrace: err.stack });
}

module.exports = errorHandler;