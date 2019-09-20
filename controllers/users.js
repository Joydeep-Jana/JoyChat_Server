const Mongoose = require('mongoose');
const Jwt = require('jsonwebtoken');
const Users = require('../models/user');
const { JWT_SECRET } = require('../config/keys');

class UserController
{
    getSignedToken(newUser)
    {
        return Jwt.sign(
        {
            iss: 'joydeep',
            sub: newUser.id,
            iat: new Date().getTime(),
            exp: new Date().setDate(new Date().getDate() + 1)   
        },JWT_SECRET);
    }
    async signUp(req, res, next)
    {
        const {name, email, password} = req.value.body;

        //check whether the user already exists
        const foundUser = await Users.findOne({email});
        if (foundUser)
        {
            return res.status(403).json(
            {
                isOk: false,
                messsage: "user already exists"
            });
        }

        //create a new user
        const newUser = new Users(
        {
            name, email, password
        });

        newUser.save().then(()=>
        {
            const token = this.getSignedToken(newUser);
            res.status(200).json(
            {
                isOk: true,
                messsage: "Your account has been sucessfully created.",
                token
            });
        }).catch((err)=>
        {
            res.status(403).json(
            {
                isOk: false,
                messsage: "An error occured" 
            });
        })
        //response back to client
    }
    async signIn(req, res, next)
    {
        console.log(this);
        const token = this.getSignedToken(req.user);
        res.status(200).json(
        {
            isOk: true,
            messsage: "You are sucessfully signed in.",
            token
        });
    }

    async secret(req, res, next)
    {
        console.log("secret called");
    }
}

module.exports = UserController;