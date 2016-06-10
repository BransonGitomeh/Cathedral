import http from 'http'
import express from 'express';

import contentTypes from "./utils/content-types"
import sysInfo from './utils/sys-info'
import routes from './routes';

const app = express();

app.use('/', routes);

app.use(function(req, res, next) {
  console.log(req.method + "    " + req.url)

  const startTime = new Date()

  res.on("finish", function() {

    const endTime = new Date();

    const timeTaken = endTime - startTime;

    console.log("done in %sms", timeTaken);

  })

  next()
})

app.use('/', express.static(__dirname + '/static'))

app.use(function(req,res,next){
  let url = req.url;
  if (url.indexOf('/info/') == 0) {
    res.setHeader('Content-Type', 'application/json');
      res.setHeader('Cache-Control', 'no-cache, no-store');
      res.send(JSON.stringify(sysInfo[url.slice(6)]()));
  }
  next()
})


const server = app.listen(process.env.NODE_PORT || 3000, process.env.NODE_IP || 'localhost', () => {

  const {
    address,
    port
  } = server.address();

  console.log(`Application worker ${process.pid} started... *:http://${address}:${port}` );
});