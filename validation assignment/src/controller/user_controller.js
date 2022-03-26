const express = require('express')
const {body,validationResult}=require("express-validator");
const router=express.Router();
const User=require("../model/user");

router.post(
    "/",
    body("first_name").isLength({min:1}).withMessage("first name is required"),
    body("last_name").isLength({min:1}).withMessage("last name is required"),
    body("email").isEmail().withMessage("valid email is required"),
    body("pincode").isLength({min:6,max:6}).withMessage("pincode should have 6 digits"),
    body("age").isInt({min:1,max:100}).withMessage("age should be in between 1 to 100"),
    body("gender").custom((value)=>{
        if(value=="male"||value=="female"){
            return true
        }
        else{
            throw new Error("gender should be either male or female")
        }
    }),
    async(req, res)=>{
        const errors= validationResult(req,res);
        if(!errors.isEmpty()){
            return res.status(400).send({errors:errors.array()})
        }
        const user=await User.create(req.body);
        return res.status(201).send({data:user})
    }
);
module.exports=router