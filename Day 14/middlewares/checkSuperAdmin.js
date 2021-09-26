const check = (req, res,next) =>{
    if(req.session.User.role === "super-admin"){
        // next()
        res.status(200).send("connect as a super admin")
    }else{
        res.status(401).send("Need to be super admin")
    }
}

module.exports = check