var express = require('express');
var path = require('path');
require('dotenv').config();
const mongoose = require('mongoose');

const indexRouter = require('./routes/index');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  console.log("connected to mongo");
}).catch((e) => {
  console.log(e);
});

var app = express();

app.use(express.json());

console.log('Express started. Listening on port', process.env.PORT || 5000);
console.log("Testing");
app.listen(process.env.PORT || 5000);

app.use(express.static(path.join(__dirname, "../client/public/")));

app.use('/api', indexRouter);

app.get("/*", (req, res) => {
  console.log("Matching api route not found");
  res.sendFile(path.join(__dirname, "../client/public/index.html"));
});

function handleError(err, req, res, next) {
  const statusCode = err.statusCode ? err.statusCode : 500
  const message = err.message ? err.message : 'Something broke!'
  console.error(err.stack)
  res.status(statusCode).send(message)
}

app.use(handleError);

module.exports = app;
