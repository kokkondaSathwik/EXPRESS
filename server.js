//create express application
    // import express module
    const exp = require('express');
    // create express application
    const app = exp();

    //

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
        console.log(newUser);
    })
    //update a user by Id
    app.put('/user',(req,res)=>{
        res.send('Update a User by Id');
    })
    //delete a user by Id
    app.delete('/users/id',(req,res)=>{
        res.send('Delete a User by Id');
    })

//assign port numbr to HTTP Server
app.listen(4000,()=>{
    console.log('server is running on port 4000');
});
