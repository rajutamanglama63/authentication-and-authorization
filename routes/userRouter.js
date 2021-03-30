const express = require("express");
const passport = require("passport");
const JWT = require("jsonwebtoken");

const User = require("../model/User");
const Todo = require("../model/Todo");
const passportConfig = require("../passport");

const router = express.Router();

const signToken = (userId) => {
    return JWT.sign({
        iss : "rajuCoder",
        sub : userId
    }, "rajuCoder", {expiresIn : "1h"});
}

router.post("/register", (req, res) => {
    const { username, password, role } = req.body;

    User.findOne({username}, (err, user) => {
        if(err)
            res.status(500).json({message : {msgBody : "Server error", msgError : true}});
        if(user) 
            res.status(400).json({message : {msgBody : "Username already exist", msgError : true}});
        else{
            const newUser = new User({username, password, role});
            newUser.save((err) => {
                if(err)
                    res.status(500).json({message : {msgBody : "Server error", msgError : true}});
                else
                    res.status(201).json({message : {msgBody : "Account successfully created", msgError : false}});
            });
        }
    })
});


router.post("/login", passport.authenticate('local', {session : false}), (req, res) => {
    if(req.isAuthenticated()) {
        const {_id, username, role} = req.user;
        const token = signToken(_id);
        res.cookie("access_token", token, {httpOnly : true, sameSite : true});
        res.status(200).json({isAuthenticated : true, user : {username, role}})
    }
})


router.get("/logout", passport.authenticate("jwt", {session : false}), (req, res) => {
    res.clearCookie("access_token");
    res.json({user : {Username : "", role : ""}, success : true})
})


router.post("/todo", passport.authenticate("jwt", {session : false}), (req, res) => {
    const todo = new Todo(req.body);
    todo.save((err) => {
        if(err)
            res.status(500).json({message : {msgBody : "Server error", msgError : true}});
        else{
            req.user.todos.push(todo);
            req.user.save((err) => {
                if(err)
                    res.status(500).json({message : {msgBody : "Server error", msgError : true}});
                else
                    res.status(200).json({message : {msgBody : "Todo created successfully.", msgError : false}});
            })
        }
    })
})


router.get('/todos',passport.authenticate('jwt',{session : false}),(req,res)=>{
    User.findById({_id : req.user._id}).populate('todos').exec((err,document)=>{
        if(err){
            res.status(500).json({message : {msgBody : "Server error", msgError: true}});
            console.log(err);
        }else{
            res.status(200).json({todos : document.todos, authenticated : true});
        }
    });
});


router.get('/admin',passport.authenticate('jwt',{session : false}),(req,res)=>{
    if(req.user.role === 'admin') {
        res.status(200).json({message : {msgBody : "you're an admin.", msgError : false}});
    } else {
        res.status(403).json({message : "you're not an admin, go back.", msgError : true});
    }
});


router.get('/authenticated',passport.authenticate('jwt',{session : false}),(req,res)=>{
    const { username, role } = req.user;
    res.status(200).json({isAuthenticated : true, user : {username, role}});
});

module.exports = router;