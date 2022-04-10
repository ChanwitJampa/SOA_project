
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { getMaxListeners, findOne } = require('../models/userModel');
const { hidden } = require('colors');


//@desc login
//@route POST /api/login
//@access Private
const login = asyncHandler(async (req, res) => {


    
    const { userName, password } = req.body
    console.log("login "+userName+password)
    //validate user input
    if (!(userName && password)) {
        res.status(400)
        throw new Error('userName or password are  required')
    }

    const user = await User.findOne({ userName }).select('+password')

    if (user) {
        // if ((await bcrypt.compare(password, user.password))) {
        if (password == user.password) {
            const token = jwt.sign(
                { user_id: user._id, userName },
                process.env.TOKEN_KEY, {
                expiresIn: "24h"
            })
            //save token in uuser
            const oldUser = await User.findOne({ userName },'-createdAt -updatedAt')
            //if want to deselect _id await User.findOne({ userName }, '-_id')
            oldUser.token = token
            res.status(200).json(oldUser)
        }
        else{
            res.status(400)
            throw new Error('wrong userName or password')
        }

    }
    else{
        res.status(400)
        throw new Error('wrong userName or password')
    }

   


})








module.exports = {
    login
}