const express = require('express')
const cors = require('cors')
const api = require('./api')
const mongo = require('./mongo')

const PORT = 5000;
const app = express()

app.use(cors())
app.use(express.json())

//api
app.use(api)

// error handling
app.use(function (err, req, res, next) {

  let message = null;

  if (err.raw) {

    message = err.raw.message;

  }
  else if (err.message) {

    message = err.message;

  }
  else if (err.sqlMessage) {

    message = err.sqlMessage;

  }

  console.error(err);
  log.create(message, err, req);

  message ?
    res.status(500).send({ message: message }) :
    res.status(500).send(err);

});

//start server
app.listen(PORT, async () => {
  console.log("server running on port: ", PORT)
  await mongo.connect()
})

