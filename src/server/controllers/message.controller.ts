import { Request, Response } from "express";
import Message from "../database/modules/responses/schema";
import { insufficientParameters, mongoError, successResponse, failureResponse } from "../database/modules/common/service";


/**
 * Find one message by his id : /messages/{userId}
 * @param req
 * @param res
 */
export const showMessages = (req: Request, res: Response) => {

    Message.find().where('owner').equals(req.params.userId).limit(10).exec((err: any, message: any) => {
        try {
            res.status(200).send(message);
        } catch (err) {
            res.send(err);
        }
    });
};

/**
 * Add a message into the database
 * @param req
 * @param res
 */
export const addMessages = (req: Request, res: Response) => {

    console.log(req.body)
    const response = new Message(req.body);
    console.log(response)

    response.save((err: any) => {
        try {
            res.status(201).send(response);
        } catch (err) {
            console.log(err)
            res.send(err);
        }
    });

};

/**
 * Update a Message
 * @param req
 * @param res
 */
export const updateMessages = (req: Request, res: Response) => {
    Message.findByIdAndUpdate(
        req.params.id,
        req.body,
        (err: any, message: any) => {
            try {
                res.status(200).send(message);
                successResponse('update message successfull', null, res);
            } catch (err) {
                res.send(err);
                mongoError(err, res);
            }
        }
    );
};