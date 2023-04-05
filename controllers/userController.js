const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');

// create register user
exports.registerUsers = async (req, res) => {

    try {
        const { username, email, password } = req.body;
        // validation
        if (!username || !email || !password) {
            return res.status(400).send({
                message: "Please fill all fields",
                success: false
            })
        }

        // existing users
        const existingUser = await userModel.findOne({ email })
        if (existingUser) {
            return res.status(401).send({
                message: 'user already exists',
                success: false
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        // save new users

        const user = new userModel({ username, email, password: hashedPassword })
        await user.save()
        return res.status(201).send({
            success: true,
            message: "New user created",
            user
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            message: "error in register callback",
            success: false,
            error
        })
    }
};

// get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find({});
        return res.status(200).send({
            userCount: users.length,
            success: true,
            message: "all users data",
            users,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error in get all users',
            error
        })
    }
};

// login users
exports.loginUsers = async (req, res) => {
    try {
        const { email, password } = req.body;
        // validation
        if (!email || !password) {
            return res.status(401).send({
                success: false,
                message: 'Please provide email or password'
            })
        }
        const user = await userModel.findOne({ email })
        if (!user) {
            res.status(500).send({
                success: false,
                message: 'Email is not registered'
            })
        }

        // password
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).send({
                success: false,
                message: 'Invalid username or password'
            })
        }

        return res.status(200).send({
            success: true,
            message: ' Login successfully'
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: 'Error in login callback',
            error
        })
    }
};