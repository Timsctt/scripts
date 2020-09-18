import { Application, Request, Response } from 'express';
import * as UserConroller from '../controllers/user.controller';

/**
 * User's routes api
 */
export class UsersRoutes {
    public route(app: Application) {

        app.get('/users', UserConroller.allUsers);

        app.get("/users/:id", UserConroller.showUser);

        app.post("/users", UserConroller.addUser);

        app.patch("/users/:id", UserConroller.updateUser);

        app.delete("/users/:id", UserConroller.deleteUser);
    }
}