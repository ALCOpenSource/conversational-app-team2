const request = require("request");
const logger = require("../utils/log");

const crawlerGET = (Url, cb) => {
  request(
    {
      url: "https://schedge.a1liu.com/" + Url,
      method: "GET",
      json: true,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Methods": "POST,GET,OPTIONS",
      },
    },
    function (error, response, body) {
      if (!error && response.statusCode === 200) {
        cb(body);
      } else {
        console.log("Crawling Failed:" + "https://schedge.a1liu.com/" + Url);
        console.log("\n");
        console.log("[CRAWLER_ERROR]: " + error);
        logger.logger.error(error);
      }
    }
  );
};

module.exports = {
  crawlerGET: crawlerGET,
};
