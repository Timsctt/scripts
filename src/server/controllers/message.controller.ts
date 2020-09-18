import { Request, Response } from "express";
import Message from "../database/modules/messages/schema";;
import { insufficientParameters, mongoError, successResponse, failureResponse } from '../database/modules/common/service';

/**
 * Find one message by his id : /messages/{messageId}
 * @param req 
 * @param res 
 */
export const showMessages = (req: Request, res: Response) => {
    Message.findById(req.params.id, (err: any, message: any) => {
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
    console.log("-------> MESSSSAGGGGGE ===" + req)
    const message = new Message(req.body);
    message.save((err: any) => {
        try {
            res.status(201).send(message);
        } catch (err) {
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