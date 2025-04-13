const jwt = require('jsonwebtoken');

//token verification middleware

const verifyToken = (req,res,next) => {
    //token verification logic
    //bearer token
    const bearerToken=req.headers.authorization;

    //if bearer token is not available
    if (!bearerToken)
    {
        res.send({message:'unauthorized request'});
    }
    else
    {
        const token=bearerToken.split(' ')[1];
        console.log(token);

        //decode the token
        try{
        let decodedToken= jwt.verify(token,'abcdef');
        //pass req to next middleware
        next();
        }
        catch(err)
        {
            //if token is not valid
            res.send({message:err.message});
        }
    }
    
}

//export
module.exports = verifyToken;