import asyncHandler from 'express-async-handler';
import User from '../model/userModel.js';

// @description Auth user/set token
// route POST /api/users/auth
const authUser = asyncHandler (async(req, res)=>{
    res.status(200).json({message: "Auth User"});
});

// @description Auth user/set token
// route POST /api/users
const registerUser = asyncHandler (async(req, res)=>{
    const {name, email, password} = req.body;
    const userExist = await User.findOne({email});

    if (userExist){
        res.status(400);
        throw new Error('User already exists')
    }

    const user = await User.create({
        name,
        email,
        password
    });

    if (User){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email
        })
    }else{
        res.status(404)
        throw new Error('Invalid User data')
    }
});

// @description Logout User
// route POST /api/users/logout
const logoutUser = asyncHandler (async(req, res)=>{
    res.status(200).json({message: "Logout User"});
});

// @description Get user profile
// route POST /api/users/profile
// @access private
const getUserProfile = asyncHandler (async(req, res)=>{
    res.status(200).json({message: "User Profile"});
});

// @description Update user profile
// route PUT /api/users/profile
// @access private
const updateUserProfile = asyncHandler (async(req, res)=>{
    res.status(200).json({message: "Update user profile"});
});





export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile
};