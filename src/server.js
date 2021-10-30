const express = require('express');
const app = express();
const chalk = require('chalk');

const morganMiddleware = require("./utils/middlewares");


app.use(morganMiddleware);

require('./index')(app)



//express
app.set("json spaces", 1)
app.get('/', (req, res) => {
  res.redirect("https://leoapi.xyz")
})


app.listen(7000, () => {
    console.log(chalk.cyan('> API Running\n'))
    console.log(chalk.cyan('> Server Listening on Port 7000'))
    console.log(chalk.cyan("> Loaded Endpoints"))
})