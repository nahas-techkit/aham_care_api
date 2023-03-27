const jwt = require("jsonwebtoken");

function generateAccessToken(user) {
  return jwt.sign(user, process.env.TOKEN_SECRET, { expiresIn: "1hr" });
}

function generateRefreshToken(user) {
  return jwt.sign(user, process.env.TOKEN_SECRET, { expiresIn: "30d" });
}


function authenticateToken(req,res,next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split('')[1]

    if(!token){
        returnres.status(400).json({message:"Authorization token is missing"})
    }

    jwt.verify(token, process.env.TOKEN_SECRET,(err,user)=>{
        if(err) return res.status(400).json({error: "Access token expired"})
        req.user=user
        next()
    } )
}

module.exports = {generateAccessToken, generateRefreshToken, authenticateToken}