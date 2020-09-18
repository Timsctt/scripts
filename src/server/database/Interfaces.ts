import { Document } from 'mongoose';

export interface IUser extends Document {
    email: string;
    firstName: string;
    lastName: string;
    address?: Address;
}

export interface Address extends Document {
    street: string;
    city: string;
    postCode: string;
}