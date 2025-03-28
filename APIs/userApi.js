// create a mini express application 
const exp = require('express'); 
const userApp = exp.Router(); 
   
   
   
   
   
   //body parsing
    userApp.use(exp.json());

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
    userApp.get('/users',(req,res)=>{
        //send users in response
        res.send({message:'all users',payload:users});
    })
    //get a user by id
    userApp.get('/users/id',(req,res)=>{
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
    userApp.post('/new-user',(req,res)=>{
        //get new user obj
        let newUser=req.body;
        //add new user to users array
        users.push(newUser);
        //send response
        res.send({message:'User created successfully'});

    })
    //update a user by Id
    userApp.put('/user',(req,res)=>{
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
    userApp.delete('/users/:id',(req,res)=>{
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

module.exports = userApp;