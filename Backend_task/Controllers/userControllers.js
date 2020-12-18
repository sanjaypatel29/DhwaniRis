const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { registerValidator, loginValidator } = require('../validation/validation');

//  user post method for add user Detail
const registerUser = async (req, res) => {
    try {
        const { error } = registerValidator(req.body);
        if (error) {
            throw new Error(error.details[0].message);
        }
        const { userName, email, password, name, organization, designation } = req.body;
        const userExists = await User.findOne({ email });
        const chooseUniqueUserName = await User.findOne({ userName });

        const encryptedPassword = await bcrypt.hash(password, await bcrypt.genSalt(10));
        if (userExists) {
            throw new Error('Account already exists with this email id');
        }
        if (chooseUniqueUserName) {
            throw new Error('Choose Another Unique User Name');
        }

        const newUser = await new User({
            userName,
            password: encryptedPassword,
            email,
            name,
            organization,
            designation
        });
        await newUser.save();

        res.json({
            message: `${name} registered Successfully`,
            name,
            organization,
            designation
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

//  user login post method for user auth and detail
const loginUser = async (req, res) => {
    try {
        const { error } = loginValidator(req.body);

        if (error) {
            throw new Error(error.details[0].message);
        }

        const { userName, password } = req.body;
        const user = await User.findOne({ userName });

        if (!user) {
            throw new Error("Account doesn't exists");
        }

        const passwordCheck = await bcrypt.compare(password, user.password);

        if (passwordCheck) {
            const { userNameDb } = user;
            const data = { userName: userNameDb };
            const authToken = jwt.sign(data, process.env.SECRET_KEY_TO_ACCESS);
            res.json({
                isAuth: true,
                error: false,
                authToken,
                user,
                message: 'Logged in successfully'
            });
        } else {
            throw new Error('Wrong password');
        }
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

//  user get method for user logout
const logoutUser = (req, res) => {
    res.json({
        isAuth: false,
        error: false,
        message: 'User Logout successfully'
    })
}


module.exports = { registerUser, loginUser, logoutUser };
