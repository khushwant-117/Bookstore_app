const jwt = require("jsonwebtoken");

const authenticateToken = (req,re,next)=>{
    const authHeader = req.headers
    ["authorization"]
    const token = authHeader&& authHeader.split("")[1];

    if(token==null){
        return res.status(401).json({
            message : "Authentication token required"
        })
    }
    jwt.verify(token, "Bookstore123",(err,user)=>{
        if(err){
            return res
            .status(403)
            .json({message : "token expired. please sign again"});
        }
        req.user = user;
        next();
    });
};
module.exports = {authenticateToken};