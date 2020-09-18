import express, { Application } from "express";
import * as bodyParser from "body-parser";
import mongoose = require("mongoose");
import { TestRoutes } from "../routes/test_routes";
import { CommonRoutes } from "../routes/common_routes";
import { UsersRoutes } from "../routes/users_routes";
import { MessagesRoutes } from "../routes/messages_routes";
import environnement from "../database/environnement";
var cors = require('cors')

/**
 * Class to load for create the Express application.
 */
class App {

    public app: Application;
    public mongoUrl: string = 'mongodb://localhost:' + environnement.getDBPort() + '/' + environnement.getDBName();

    private test_routes: TestRoutes = new TestRoutes();
    private common_routes: CommonRoutes = new CommonRoutes();
    private users_routes: UsersRoutes = new UsersRoutes();
    private messages_routes: MessagesRoutes = new MessagesRoutes();

    /**
     * At the beginning, load all the routes in the application `app`
     * Note: Don't forget to let the `common_route` load at the really
     */
    constructor() {
        this.app = express();
        this.app.use(cors())
        this.config();
        this.mongoSetup();

        this.test_routes.route(this.app);
        this.users_routes.route(this.app);
        this.messages_routes.route(this.app)
        // Last route to add common
        this.common_routes.route(this.app);
        this.app.options('/messages', cors())
    }

    private config(): void {
        // support application/json type post data
        this.app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }

    private mongoSetup(): void {
        mongoose.connect(
            this.mongoUrl,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
                useFindAndModify: false
            }
        )
    }
}
export default new App().app;