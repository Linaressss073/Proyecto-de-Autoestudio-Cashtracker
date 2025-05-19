import jwt, { TokenExpiredError } from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config()

export const generateJWT = (id : string) =>{
    //console.log(id)

    const token = jwt.sign({id} , process.env.JWT_SECRET ,{
        expiresIn: '30d'
    })
    return token
}