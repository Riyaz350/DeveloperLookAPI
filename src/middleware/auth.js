const jwt = require("jsonwebtoken")

const {TOKEN_KEY} = process.env

const secureRoute = async (req,res,next)=>{
    const token = req.body.token || req.query.token || req.headers["x-access-token"]
    if(!token){
        return res.status(403).send("token not found")
    }

    try {
        const decoded = await jwt.verify(token, TOKEN_KEY)
        req.currentUser = decoded
    } catch (error) {
        return res.status(401).send("Invalid token")
    }

    return next()
}

module.exports = secureRoute
