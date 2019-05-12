const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const config = require('./config/default.js');
const query = require('./config/mysql.js');
var logger = require("koa-logger");
const app = new Koa()

app.use(logger());
app.use(bodyParser());


app.use(require('./routers/job.js').routes())
app.use(require('./routers/office.js').routes())
app.use(require('./routers/room.js').routes())
app.use(require('./routers/unit.js').routes())
app.use(require('./routers/user.js').routes())

app.listen(config.port)

console.log(`listening on port ${config.port}`)
