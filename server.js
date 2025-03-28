//create express application
    // import express module
    const exp = require('express');
    // create express application
    const app = exp();


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

    //body parsing
    app.use(exp.json());

    //sample user data
    let users = [
       {
        id:1,
        name:"Sathwik",
       },
       {
        id:2,
        name:"Sudha",
       }
    ]

    //user API(REST API)
    // These are called as routes
    //get all users
    app.get('/users',(req,res)=>{
        //send users in response
        res.send({message:'all users',payload:users});
    })
    //get a user by id
    app.get('/users/id',(req,res)=>{
        let id = Number(req.params.id);
        //find user by id
        let user = users.find((u)=>u.id === id);
        //send user in response
        if(user === undefined)
        {
            res.send({message:'User not found'});
        }
        else
        {
            res.send({message:'User found',payload:user});
        }
    })
    //create a user
    app.post('/new-user',(req,res)=>{
        //get new user obj
        let newUser=req.body;
        //add new user to users array
        users.push(newUser);
        //send response
        res.send({message:'User created successfully'});

    })
    //update a user by Id
    app.put('/user',(req,res)=>{
        //get modifieduser details
        let modifiedUser=req.body;
        //find index of user to be updated
        let index = users.findIndex((u)=>u.id === modifiedUser.id);
        //if user not found
        if(index === -1)
        {
            res.send({message:'User not found'});
        }
        else
        {
            //update user details
            users[index].name = modifiedUser.name;
            //send response
            res.send({message:'User updated successfully'});
        }

    })
    //delete a user by Id
    app.delete('/users/:id',(req,res)=>{
        //get id from url
        let id = Number(req.params.id);
        //find index of user to be deleted
        let index = users.findIndex((u)=>u.id === id);
        //if user not found
        if(index === -1)
        {
            res.send({message:'User not found'});
        }
        else
        {
            //delete user from users array
            users.splice(index,1);
            //send response
            res.send({message:'User deleted successfully'});
        }
    })




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
