const { readdirSync } = require("fs")
const rateLimit = require('express-rate-limit');
const slowDown = require('express-slow-down')

const speedLimiter = slowDown({
  windowMs: 15 * 60 * 1000,
  delayAfter: 100, 
  delayMs: 500
});

const createAccountLimiter = rateLimit({
  windowMs: 10000,
  max: 100, 
  message:
    "Rate Limit Exceeded"
});

const dateNow = new Date().toLocaleString('en-US', {timeZone: 'Asia/Dubai'});


module.exports = function(app) {
   readdirSync(`${__dirname}/routes`).forEach(async(dir) => {
       readdirSync(`${__dirname}/routes/${dir}/`).filter((file) => {
           file.endsWith(".js")
           const name = file.substr(0, file.indexOf('.'));
           const route = require(`${__dirname}/routes/${dir}/${file}`)
           app.get(`/${dir}/${name}`, createAccountLimiter, speedLimiter ,async(req, res) => {
            route.run(req, res)      
            })

            })
   })
}