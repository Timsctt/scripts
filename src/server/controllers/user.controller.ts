import { Request, Response } from "express";
import User from "../database/modules/users/schema";
import { insufficientParameters, mongoError, successResponse, failureResponse } from '../database/modules/common/service';

/**
 * Find all users in the database
 * @param req 
 * @param res 
 */
export const allUsers = (req: Request, res: Response) => {
    User.find((err: any, users: any) => {
        try {
            res.status(200).send(users);
        } catch (err) {
            res.send(err);
        }
    });
};

/**
 * Find one user by his id : /users/{userId}
 * @param req 
 * @param res 
 */
export const showUser = (req: Request, res: Response) => {
    User.findById(req.params.id, (err: any, user: any) => {
        try {
            res.status(200).send(user);
        } catch (err) {
            res.send(err);
        }
    });
};

/**
 * Add a user into the database
 * @param req 
 * @param res 
 */
export const addUser = (req: Request, res: Response) => {
    const user = new User(req.body);
    user.save((err: any) => {
        try {
            res.status(200).send(user);
        } catch (err) {
            res.send(err);
        }
    });
};

/**
 * Update a User
 * @param req 
 * @param res 
 */
export const updateUser = (req: Request, res: Response) => {
    User.findByIdAndUpdate(
        req.params.id,
        req.body,
        (err: any, user: any) => {
            try {
                res.send(user);
                successResponse('update user successfull', null, res);
            } catch (err) {
                res.send(err);
                mongoError(err, res);
            }
        }
    );
};

/**
 * Remove a user by his id : /users/{userId}
 * @param req 
 * @param res 
 */
export const deleteUser = (req: Request, res: Response) => {
    User.deleteOne({ _id: req.params.id }, (err: any) => {
        try {
            res.status(200).send(err);
        } catch (err) {
            console.log(err);
        }
    });
};