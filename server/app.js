var express = require('express');
var path = require('path');

var app = express();

app.use(express.json());

console.log('Express started. Listening on port', process.env.PORT || 5000);
console.log("Testing");
app.listen(process.env.PORT || 5000);

app.use(express.static(path.join(__dirname, "../client/public/")));
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/public/index.html"));
});

function handleError(err, req, res, next) {
  const statusCode = err.statusCode ? err.statusCode : 500
  const message = err.message ? err.message : 'Something broke!'
  console.error(err.stack)
  res.status(statusCode).send(message)
}
app.use(handleError)

module.exports = app;
