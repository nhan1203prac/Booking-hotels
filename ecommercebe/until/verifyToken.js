import jwt from "jsonwebtoken"
import { createError } from "./error.js"

export const verifyToken = (req,res,next)=>{
    const token = req.cookies.access_token
    if(!token)
        return next(createError(401,"You are not authenticated!"))
    jwt.verify(token,"vi1a8JuK7MQo7NhCzH4MkE3-iC_jCRyhOFiOCl2hmZI",(err,user)=>{
        if(err) return next(createError(403,"Token is not valid!"))
        console.log(user)
        req.user=user
        next()
    })
}
export const verifyUser = (req,res,next)=>{
    verifyToken(req,res,next,()=>{
        if(req.user.id === req.params.id || req.user.isAdmin){
            next()
        }
        else{
            return createError(403,"You are not authorized!")
        }
    })
}
export const verifyAdmin = (req,res,next)=>{
    verifyToken(req,res,next,()=>{
        if(req.user.isAdmin){
            next()
        }
        else{
            return createError(403,"You are not authorized!")
        }
    })
}