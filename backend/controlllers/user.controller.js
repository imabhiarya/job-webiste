import { User } from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import { json } from "express";
import jwt from 'jsonwebtoken';
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const register = async (req,res) => {
    try {
        const {fullname, email, phoneNumber, password, role} = req.body;
        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: 'Everything is required',
                success: false
            });
        }
        const file = req.file;
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

        const user = await User.findOne({email});
        if (user) {
            return res.status(400).json({
                message:"User already exist",
                success:false
            });
        }
        const hasedPassword = await bcrypt.hash(password, 10);

        await User.create({
            fullname,
            email,
            phoneNumber,
            password: hasedPassword,
            role,
            profile:{
                profilePhoto:cloudResponse.secure_url,
            }
        });
        return res.status(200).json({
            message:"User registered successfully",
            success:true
        });

    } catch (error) {
        return res.status(400).json({
            message:"User is not registred, please try again later",
            success: false
        });
    }
}

export const login = async (req, res) => {
    try {
        const {email, password, role} = req.body;
        if (!email || !password || !role) {
            return res.status(400).json({
                message: "All fields are required",
                success:false
            });
        };
        let user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({
                message:"User not registered"
            });
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message:"email or password is incorret",
                success:false
            });
        }
        if (role !== user.role) {
            return res.status(400).json({
                message: "Account does not exist with this role",
                success: false
            })
        }

        const tokenData = {
            userId :user._id,
        }
        const token = jwt.sign(tokenData, process.env.SECRET_KEY, {expiresIn:'1d'});

        user ={
            id : user._id,
            fullname: user.fullname,
            email : user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }
            // console.log(token, user);
            
        return res.status(200).cookie("token",token, {maxAge: 1*24*60*60*1000, httpsOnly:true, sameSite:'strict'}).json({
            message:`Welcome Back ${user.fullname}`,
            user,
            success:true
        })

    } catch (error) {
        return res.status(400).json({
            message: "error occured during login, please try again later",
            success: false
        });
    }
}

export const logout = async (req,res) => {
    try {
        return res.status(200).cookie("token", "", {maxAge:0}).json({
            message: "Logged out successfully",
            success:true
        })
    } catch (error) {
        return res.status(400).json({
            message:"Error while logging out",
            success:false
        })
    }
}

export const updateProfile = async (req,res) => {
    try {
        const {fullname, email, phoneNumber, bio, skills} = req.body;
        const file = req.file;
        const fileUri = getDataUri(file);
        //cloudinary
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);


        let skillsArray;
        if (skills) {
             skillsArray = skills.split(",");
        }
        const userId = req.id; // middleware
        let user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({
                message: "User not found",
                success: false
            });
        }
        if(fullname) user.fullname = fullname;
        if(email) user.email = email;
        if(phoneNumber) user.phoneNumber = phoneNumber;
        if(bio) user.profile.bio= bio;
        if(skills) user.profile.skills= skillsArray;
        


        // resume comes later
        if (cloudResponse) {
            user.profile.resume = cloudResponse.secure_url; // save url of cloudinary
            user.profile.resumeOriginalName = file.originalname ; //save original file name
        }


        await user.save();
        user = {
            _id: user._id,
            fullname : user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role : user.role,
            profile: user.profile
        }

        return res.status(200).json({
            message:"profile updated successfully",
            success: true,
            user
        });


    } catch (error) {
        return res.status(400).json({
            message: "Error occured while updating profile",
            success:false
        });
    }
}
