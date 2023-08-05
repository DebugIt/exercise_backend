const express = require("express");
const User = require("../models/userModel");

const usersRouter = express.Router();

// finding user
usersRouter.get("/", (req, res) => {
    User.find().then(users => res.status(200).json(users))
    .catch((err)=>res.status(500).json({message: `Error: ${err}`}));
})


usersRouter.post("/createuser", async(req, res) => {
    const username = req.body.username;
    
    const alreadyExists = await User.findOne({username});
    if(alreadyExists){
        res.status(401).json({success: true, message:"User Already Exists"})
    }
    else{
        // creating a new user
        const newUser = new User({username});
        // saving newly created user
        newUser.save()
        .then(() => res.status(200).json({message: "User created", success: true}))
        .catch((err) => res.json({message: `Error: ${err}`, success: false}))
    }


    
    
    

})

module.exports = usersRouter;