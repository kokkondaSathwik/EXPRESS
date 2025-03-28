//create express application
    // import express module
    const exp = require('express');
    // create express application
    const app = exp();

    //import user and product app

    const userApp = require('./APIs/userApi');
    const productsApp = require('./APIs/productsApi');

    //forward req to userApp if path starts with /user-api
    app.use('/user-api',userApp);
    //forward req to productsApp if path starts with /products-api
    app.use('/products-api',productsApp);

    //testing of middleware at application level
    // function test1(req,res,next)
    // {
    //     console.log('test1 middleware called');
    //     next();
    // }


    // function test2(req,res,next)
    // {
    //     console.log('test2 middleware called');
    //     next();
    // }
    // app.use(test1);
    // app.use(test2);
    // app.use(test1);


function errorHandler(err,req,res,next)
{
    res.send({errMessage:err.message});
}
//error handling middleware
app.use(errorHandler);



//assign port numbr to HTTP Server
app.listen(4000,()=>{
    console.log('server is running on port 4000');
});
