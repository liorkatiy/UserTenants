//response middleware
function dataSender(req, res, next) {
  res.sendData = (item) => {
    const returnItem = item.error ? sendError(item.error) : sendData(item);
    res.json(returnItem);
  }
  next();
}

function sendData(item) {
  return {
    item
  };
}

function sendError(error) {
  error = error == null ? "error" : error;
  return {
    error
  };
}

module.exports =
  dataSender;