import asyncHandler from 'express-async-handler';
import User from '../model/userModel.js';
import generateToken from '../utils/generateTokens.js';



// @description Auth user/set token
// route POST /api/users/auth
const authUser = asyncHandler (async(req, res)=>{
    const {email, password} = req.body;

    const user = await User.findOne({email});
    if (user && (await user.matchPassword(password))) {
        generateToken(res, user._id); 
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email
        })
    }else{
        res.status(401)
        throw new Error('Invalid email or password')
    }
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
        generateToken(res, user._id); 
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
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    } )
    res.status(200).json({message: "User logged out"});
});

// @description Get user profile
// route POST /api/users/profile
// @access private
const getUserProfile = asyncHandler (async(req, res)=>{
    const user = {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email
    }
    // console.log(req.user);
    res.status(200).json(user);
});

// @description Update user profile
// route PUT /api/users/profile
// @access private
const updateUserProfile = asyncHandler (async(req, res)=>{
    const user = await User.findById(req.user._id);

    if (user){
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if (req.password){
            user.password = req.body.password;
        }

        const updatedData = await user.save();
        res.status(200).json({
            _id: updatedData.id,
            name: updatedData.name,
            email: updatedData.email
        })
        // res.status(200).json({message: "Update user profile"});
    }else{
        res.status(404);
        throw new Error('User not found');
    }
    
});





export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile
};