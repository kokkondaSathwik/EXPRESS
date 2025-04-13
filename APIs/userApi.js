// create a mini express application 
const exp = require('express'); 
const bcryptjs=require('bcryptjs');
const userApp = exp.Router(); 
const jwt = require('jsonwebtoken');
const verifyToken = require('../Middlewares/verifyToken');
const expressAsyncHandler = require('express-async-handler');
   
   
   
   
   
   //body parsing
    userApp.use(exp.json());


    //user API(REST API)
    // These are called as routes
    //get all users
    userApp.get('/users',async(req,res)=>{

        //get userscollectionsObject from express onj
        const userscollectionsObject= req.app.get('userscollectionsObject')
        //get users documents from db
        let usersList=await userscollectionsObject.find().toArray()
        
        //send res
        res.send({message:'users list',payload:usersList})  

    })
    //get a user by id
    userApp.get('/users/id',(req,res)=>{

    })





    //create a user
    userApp.post('/new-user',async(req,res)=>
    {
        //get usercollectionsObject from express app
        const userscollectionsObject= req.app.get('userscollectionsObject')
        //get user from request
        let newUser=req.body;
        //check duplicate user by username
        let dbuser = await userscollectionsObject.findOne({username:newUser.username})
        //if user found
        if(dbuser)
        {
            //send error message to client
            res.send({message:'user already exists'});
        }
        else
        {
        //hash the password
        let hashedPassword= await bcryptjs.hash(newUser.password,6);
        //replace plain password with hashed password
        newUser.password=hashedPassword;

        // Save user in db
        await userscollectionsObject.insertOne(newUser)
        //send res to client
        res.send({message:'user created successfully'});
        }
        
    });

    //login user ROUTE
    userApp.post('/login',async(req,res)=>{
        //get usercollectionsObject from express app
        const userscollectionsObject= req.app.get('userscollectionsObject')
        
        //get user cred obj from client
        const userCredObj=req.body;

        //verify username
        let dbuser=await userscollectionsObject.findOne({
            username:userCredObj.username,
        });

        //if user not found
        if(dbuser === null)
        {
            //send error message to client
            res.send({message:'invalid username'});
        }
        else
        {
            //verify the password
            let status=await bcryptjs.compare(userCredObj.password,dbuser.password)
            //if password are not matched
            if(status===false)
            {
                //send error message to client
                res.send({message:'invalid password'});
            }
            else
            {
                //create JWT token
                let encodedToken=jwt.sign({username:dbuser.username},'abcdef',{expiresIn:40})
                //remove password from dbuser object
                delete dbuser.password;
                //send token to client
                res.send({message:'login success',token:encodedToken,user:dbuser});
            }   
        }
        
    });


    //protected route for testing
    userApp.get('/test-protected',verifyToken,(req,res)=>{
        res.send({message:'This res from protected route'})
    })





















    
    //update a user by Id
    userApp.put('/user',async(req,res)=>{
        const userscollectionsObject= req.app.get('userscollectionsObject')
        //get modified user from request
        let modifiedUser=req.body;
        //update user in db
        await userscollectionsObject.updateOne({username:modifiedUser.username},{$set:{...modifiedUser}})
        //send response
        res.send({message:'user updated successfully'});
    })
    //delete a user by Id
    userApp.delete('/users/:username',async(req,res)=>{
        const userscollectionsObject= req.app.get('userscollectionsObject')
        let usernameFromUrl=req.params.username
        //delete user by username
        await userscollectionsObject.deleteOne({username:usernameFromUrl})
        //send response
        res.send({message:'user deleted successfully'});

    })

module.exports = userApp;