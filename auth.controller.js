const User = require("../models/user.model")

require("dotenv").config()

const jwt = require("jsonwebtoken")

const {  validationResult } = require('express-validator');

const newToken = (user) => {
    return jwt.sign({ user: user }, process.env.JWT_SECRET_KEY, { expiresIn: 60 * 5 })
}

const register =async (req, res) => {
    try {

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
            return res.status(400).send({ message: "User with that email already exists" })

        user = await User.create(req.body)

        const token = newToken(user)

        return res.status(201).send({ user, token })

    } catch (err) {
        res.status(500).send({ message: err.message + " in register" })
    }
}

const login = async (req, res) => {
    try {

        let user = await User.findOne({ email: req.body.email })

        if (!user)
            return res.status(400).send({ message: "User with that email doesn't  exists" })

        const match = user.checkPassword(req.body.password)


        if (!match)
            return res.status(400).send({ message: "password didn't match" })

        const token = newToken(user)

        return res.status(201).send({ user, token })

    } catch (err) {
        return res.status(500).send({ message: err.message + " in login" })
    }
}


module.exports = { register, login }