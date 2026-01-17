import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const protectAuth = async (req, res, next) => {
   let token;

   if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  // 2️⃣ Check cookies
  if (!token && req.cookies?.token) {
    token = req.cookies.token;
  }

   
   if(!token){
    return res.status(401).json({message:"Unauthorized, no token"});
   }

    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        req.user=decoded;
        next();
    }catch(error){
        return res.status(401).json({message:" invalid token"});
    }

}

export default protectAuth;