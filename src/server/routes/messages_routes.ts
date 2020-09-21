import { Application, Request, Response } from 'express';
import * as MessageController from '../controllers/message.controller';

/**
 * User's routes api
 */
export class MessagesRoutes {
    public route(app: Application) {

        // No routes for getAll and delete

        app.get("/messages/:userId", MessageController.showMessages);

        app.post("/messages", MessageController.addMessages);

        app.patch("/messages/:id", MessageController.updateMessages);
    }
}