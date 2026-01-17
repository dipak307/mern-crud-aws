import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import  User  from '../models/user.model.js';




export const  userLogin = async(req, res) => {
    const {password,email}=req.body;
    const user=await User.findOne({email});
    if(!user){
        return res.status(400).json({message:"User not found"});
    }

   const ispasswordCorrect= bcrypt.compare(password,user.password);
   if(!ispasswordCorrect){
    return res.status(400).json({message:"Invalid credentials"});
   }
   const token=jwt.sign({id:user._id,user:user,role: user.role},process.env.JWT_SECRET,{expiresIn:'7h'});

   res.cookie('token',token,{httpOnly:true,
    // secure:true,   // production
    // sameSite:'none', // production

    secure: false,      // localhost
    sameSite: 'lax', // localhost
     maxAge: 7 * 24 * 60 * 60 * 1000,
});

   return res.status(200).json({message:"Login successful",user:user.role,token:token,user});
};

export const  userSignup = async(req, res) => {
    const {username,password,email,role}=req.body;
    if(!username || !password || !email || !role){
        return res.status(400).json({message:"All fields are required"});
    }
    let user = await User.findOne({ email });
    if(user){
       return res.status(400).json({message:"User already exists"});
    }else{
        user = new User();
    }
    user.username=username;
    user.password=await bcrypt.hash(password,10);
    user.email=email;
    user.role=role;
    await user.save();
    return res.status(201).json({message:"User registered successfully",user});
}


export const getMe = async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};















export const  getAllUsers = async(req, res) => {
    const users=await User.find();
    return res.status(200).json({message:"Users retrieved successfully",users});
}
      
export const  getSingleUsers = async(req, res) => {
    const reqId=req.params.id;
    const user=await User.findOne({_id:reqId});
    if(!user){
        return res.status(404).json({message:"User not found"});
    }
    return res.status(200).json({message:"User retrieved successfully",user});
}

export const  deleteSingleUsers = async(req, res) => {
    const reqId=req.params.id;
    const user=await User.findOneAndDelete({_id:reqId});
    return res.status(200).json({message:"User deleted successfully",user});
}

export const  updateSingleUsers = async(req, res) => {
    const reqId=req.params.id;
    const {username,password,email}=req.body;
    const user=await User.findOne({_id:reqId});
    if(!user){
        return res.status(404).json({message:"User not found"});
    }
    user.username=username;
    user.password=await bcrypt.hash(password,10);
    user.email=email;
    await user.save();
    return res.status(200).json({message:"User updated successfully",user});
}


