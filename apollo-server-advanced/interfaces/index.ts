import { Request } from 'express';

export interface RequestCustom extends Request
{
    isAuth: boolean;
    user:object
}
