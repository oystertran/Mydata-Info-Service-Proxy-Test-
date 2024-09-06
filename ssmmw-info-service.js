const app_cnfg = require("./config/ap.config.json");
const common = require("./lib/common.js");

process.env.NODE_ENV = app_cnfg.ENV;
process.env.APP_NAME = app_cnfg.APP_NAME;

process.env.QUEUE_ENV = common.setQueueName(
  app_cnfg.ENV,
  app_cnfg.APP_AGENCY,
  app_cnfg.APP_NAME
);
process.env.UV_THREADPOOL_SIZE = 128; // test
const redis_cnfg = require("./config/redis.config.json")[
  process.env.NODE_ENV || "DEVT"
];

var express = require("express");
var main = require("./app/routes/main.js");
var profile = require('./app/routes/profile.js');
var acgs = require("./app/routes/acgs.js");
var fin = require("./app/routes/fin.js");
var cert = require('./app/routes/cert.js');

var app = express();

function REST() {
  var self = this;
  self.configureExpress();
}

REST.prototype.configureExpress = function () {
  var self = this;

  let i = 0;
  while (i < app_cnfg.APP_WORKER) {
    const worker_info = require("./app/redis/worker-info.js")();
    i++;
  }
  console.log(
    "INFO: [QUEUE]",
    process.env.QUEUE_ENV,
    redis_cnfg.REDIS_CNFG.redis,
    i,
    "CONSUMERS."
  );

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json({ limit: "2mb" }));

  var router = express.Router();
  app.use("/ssmmw-info", router);

  var main_router = new main(router);
  var acgs_router = new acgs(router);
  var fin_router = new fin(router);
  var profile_router = new profile(router);
  var cert_router = new cert(router);

  app.get("/", function (req, res) {
    res.json({ Message: "SSMMW-INFO-SERVICE" });
  });

  app.get("*", function (req, res) {
    res.json({ errorMsg: "invalid endpoint url / method", successCode: "11" });
  });

  self.startServer();
};

REST.prototype.startServer = function () {
  app.set("trust proxy", "127.0.0.1");

  const server = app.listen(app_cnfg.APP_PORT, function () {
    // set timeout for server
    server.timeout = app_cnfg.APP_TIMEOUT;
    console.log(
      "INFO: [APWKR]",
      process.env.NODE_ENV,
      app_cnfg.APP_AGENCY,
      app_cnfg.APP_NAME,
      "PORT:",
      app_cnfg.APP_PORT,
      "T/O:",
      server.timeout
    );
  });
};

REST.prototype.stop = function (err) {
  console.log("ERRO: ISSUE WITH MYSQL n" + err);
  // process.exit(1);
};

new REST();
