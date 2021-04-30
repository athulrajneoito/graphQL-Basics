import { Request, Response, NextFunction } from 'express';
import { verify } from "jsonwebtoken";
import { config } from '../config';
import { User } from '../models'
import { RequestCustom } from '../interfaces';


export const authMidddleware = async (expressRequest: Request, _res: Response, next: NextFunction) => {


    const req: RequestCustom = expressRequest as RequestCustom;

    const authHeaders = req.get('Authorization');

    if (!authHeaders) {
        req.isAuth = false;
        return next();
    }

    // get token
    let token: string = authHeaders.split(' ')[1];
    if (!token) {
        req['isAuth'] = false;
        return next();
    }
    // decode token
    let decodedToken: any;
    try {
        decodedToken = verify(token, config.SECRET);

    } catch (error) {
        req['isAuth'] = false;
        return next();
    }
    if (!decodedToken) {
        req['isAuth'] = false;
        return next();
    }
    // get user from token
    let user = await User.findById(decodedToken._id);


    if (!user) {
        req['isAuth'] = false;
        return next();
    }
    req['user'] = user;
    req['isAuth'] = true;
    return next();
}
