import { Application, Request, Response } from 'express';
import * as UserController from '../controllers/user.controller';

/**
 * User's routes api
 */
export class UsersRoutes {
    public route(app: Application) {

        app.get('/users', UserController.allUsers);

        app.get("/users/:id", UserController.showUser);

        app.post("/users", UserController.addUser);

        app.patch("/users/:id", UserController.updateUser);

        app.delete("/users/:id", UserController.deleteUser);
    }
}