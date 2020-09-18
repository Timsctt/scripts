import express, { Application } from 'express';
import bodyParser from 'body-parser';
import Bundler from "parcel-bundler";

import path from 'path';
import app from './server/config/app'
import env from './server/database/environnement'

/////// FRONT ///////
const portClient: number = 3000;
const appClient: Application = express();

appClient.use(bodyParser.json());
appClient.use(bodyParser.urlencoded({ extended: true }));

const bundler = new Bundler(path.join(__dirname, "../src/client/index.html"));
appClient.use(bundler.middleware());

appClient.use(bodyParser.json({
  limit: '50mb',
  verify(req: any, res, buf, encoding) {
    req.rawBody = buf;
  }
}));

appClient.listen(portClient, () => {
  console.log(`App client run on ${portClient}`);
});

/////// SERVER ///////
const PORT = env.getPort();

app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});

