const Koa = require('koa');
const path = require('path');
const app = new Koa();
const port = 9000;
const cors = require('koa2-cors');
const bodyParser = require('koa-bodyparser');
const static = require("koa-static");
app.use(static(path.join(__dirname)+'/public/'));

app.use(bodyParser());
app.use(cors());

const api = require('./app/api');
app.use(api.routes()).use(api.allowedMethods());

app.listen(port);
console.log(`app started at port ${port}...`);
