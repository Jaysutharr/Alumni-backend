// const role = require("../model/role_model")
// ; const role = require('../models/role'); // Import the role model
// const fs = require('fs');

const Role = require('../model/role_model'); // Import the Role model


exports.CreateroleDetails = async function (req, res) {   
    try {
        const { role } = req.body;
       

        // Check if the role exists in the database
        const existingRole = await Role.findOne({ role });

        // Update existing role or create a new one
        const updatedRole = existingRole
            ? await Role.findOneAndUpdate(
                { role },
                { new: true } // Update existing role
            )
            : await Role.create({ role,  }); // Create new role

        const message = existingRole ? 'Role updated successfully.' : 'Role created successfully.';
        return res.json({ success: true, message, role: updatedRole });
    } catch (error) {
        console.error('Error creating or updating role:', error);
        return res.status(500).json({ success: false, message: 'Internal server error.' });
    }
};






exports.viewroleDetails = async(req,res)=>{
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const totalCount = await Role.countDocuments();
        const totalPages = Math.ceil(totalCount / limit);
        const result = await Role.find().sort({ createdAt: -1 }).skip(skip)
        .limit(limit)
        .exec();
        res.json({
            count:result.length,
            success:true,
            message:"Get Role Details",
            totalCount,
            totalPages,
            data:result,
        })
    } catch (error) {
        res.json({
            success:false,
            message: `Something went worng `+ error.message,
            data:null
         })
    }
}
exports.deleteroleDetails = async(req,res)=>{
    try {
        const result = await Role.findOneAndDelete({roleId:req.params.roleId})
        res.json({
            success:true,
            message:"Delete role Details",
            data:null
        })
    } catch (error) {
        res.json({
            success:false,
            message:"Something  went wrong"+error.message,
            data:null
        })  
    }
}



exports.updateroleDetails = async(req,res)=>{
    try {
        const result = await Role.findOneAndUpdate({role:req.body.role} , req.body , {
            new: true,
            runValidators: true,}).sort({ updatedAt: -1 })
        res.json({
            success:true,
            message:"Update Role Details",
            data:result
        })
    } catch (error) {
        res.json({
            success:false,
            message:"Something  went wrong"+error.message,
            data:null
        })  
    }
}
exports.getSingleroleDetails = async(req,res)=>{
    try {
        const result = await Role.findOne({role:req.params.role})
        res.json({
            success:true,
            message:"Get a Single Role Details",
            data:result
        })
    } catch (error) {
        res.json({
            success:false,
            message:"Something  went wrong"+error.message,
            data:null
        })  
    }
}