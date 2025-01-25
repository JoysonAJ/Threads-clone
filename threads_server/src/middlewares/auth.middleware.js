import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";

export const verifyJWT = async (req, res, next) => {
  
  try {
    const token = req.cookies.accessToken;
    
    if (!token) {
      throw new ApiError(400, "No token in auth !");
    }
    
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    
    if (!decodedToken) {
      throw new ApiError(400, "Error while decoding token in auth !");
    }
    
    const user = await User.findById(decodedToken._id)
    // .populate("followers")  
    // .populate("threads")
    // .populate("replies")
    // .populate("reposts");
    
    if (!user) {
      throw new ApiError(400, "No user found !");
    }
    req.user = user;
    next();
  } catch (error) {
    console.log('error in the middleware',error);
    
    return res
      .status(error.statusCode)
      .send(new ApiError(error.statusCode, error.message));
  }
};
