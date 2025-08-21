import userModel from "../model/userModel.js";

export const create = async(req ,res) =>{
    try {
        const newUser= new userModel(req.body);
        const {email}=newUser;
        const userExist = await userModel.findOne({email});
        if (userExist) {
            return res.status(400).json({message: "User already exists"});
        }
        const savedData = await newUser.save();
        res.status(200).json(savedData); 
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}


export const getAllUsers = async(req, res) =>{
    
}