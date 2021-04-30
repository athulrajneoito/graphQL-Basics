import { sign } from "jsonwebtoken";
import {config} from '../config'

interface user{
    username:string,
    password:string,
    email:string,
    name:string
}
export const createToken = async (user:user):Promise<string>=>{
    let token = await sign(user,config.SECRET);
    return token;
}
