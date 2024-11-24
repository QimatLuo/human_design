import * as http from "node:http";
import { mock } from "./mock";

http
  .createServer((req, res) => {
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.setHeader("Access-Control-Allow-Origin", "*");

    if (req.method === "POST") {
      req.on("data", async (x: Buffer) => {
        console.log();
        const localTime = JSON.parse(x.toString("ascii")).tzData.time;
        const item = mock.get(localTime.slice(0, -1));
        if (item) {
          res.setHeader("content-type", "application/json");
          res.end(JSON.stringify(item));
        } else {
          res.statusCode = 404;
          res.setHeader("content-type", "application/json");
          res.end(
            JSON.stringify({
              message: localTime,
            }),
          );
        }
      });
    } else {
      res.end();
    }
  })
  .listen(process.env["PORT"], () => {
    console.log(new Date().toJSON(), "server up at port", process.env["PORT"]);
  });
