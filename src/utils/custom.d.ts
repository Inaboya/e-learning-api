import { Request } from 'express';

export interface CustomRequests extends Request {
    user?: any;
}