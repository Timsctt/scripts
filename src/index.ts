import express from "express";
import Bundler from "parcel-bundler";
import path from "path";
import * as bodyParser from 'body-parser';
import { connect } from "./server/database/database";

connect();


const app = express();
const port = 3000 || process.env.PORT;

const bundler = new Bundler(path.join(__dirname, "../src/client/index.html"));
app.use(bundler.middleware());

app.use(bodyParser.json({
  limit: '50mb',
  verify(req: any, res, buf, encoding) {
      req.rawBody = buf;
  }
}));

app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`server started at http://localhost:${port}`);
});
