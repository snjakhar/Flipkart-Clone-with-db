const User = require("../models/user.model")

require("dotenv").config()

const jwt = require("jsonwebtoken")

var alert = require('alert');

const {  validationResult } = require('express-validator');

const newToken = (user) => {
    return jwt.sign({ user: user }, process.env.JWT_SECRET_KEY, { expiresIn: 60 * 5 })
}

const register =async (req, res) => {
    try {
       console.log(req.body)
        const errors = validationResult(req);
        if (!errors.isEmpty()) {

            const newError=errors.array().map((err)=>{
                return {
                    message:err.msg,
                    field:err.param
                }
            })
            
           
            return res.status(400).json({ errors: newError });
          }

        let user = await User.findOne({ email: req.body.email }).lean().exec()

        if (user)
        {
            alert("This email already exist")
            res.send('<script>window.location.href="http://127.0.0.1:5500/FrontEnd/sujata%20code/signup.html";</script>');
        }

        user = await User.create(req.body)

        const token = newToken(user)
        alert("Register Successfully")
        res.send('<script>window.location.href="http://127.0.0.1:5500/FrontEnd/index.html";</script>');
    } catch (err) {
        
        res.status(500).send({ message: err.message + " in register" })
    }
}

const login = async (req, res) => {
    try {
console.log(req.body)
        let user = await User.findOne({ email: req.body.email })

        if (!user)
            {
                alert("Invalid email or password")
                res.send('<script>window.location.href="http://127.0.0.1:5500/FrontEnd/index.html";</script>');
            }

        const match = user.checkPassword(req.body.password)


        if (!match)
            {
                alert("Invalid email or password")
                res.send('<script>window.location.href="http://127.0.0.1:5500/FrontEnd/index.html";</script>');
            }

        const token = newToken(user)
        alert("Login Successfully")
        res.send('<script>window.location.href="http://127.0.0.1:5500/FrontEnd/index.html";</script>');

    } catch (err) {
        return res.status(500).send({ message: err.message + " in login" })
    }
}


module.exports = { register, login }