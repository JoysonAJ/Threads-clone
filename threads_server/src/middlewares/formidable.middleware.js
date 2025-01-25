import formidable from "formidable";
import { ApiError } from "../utils/ApiError.js";

export const formidableAuth = async (req, res,next) => {
  const form = formidable({});
  try {
    form.parse(req, async (err, fields, files) => {
      if (err) {
        throw new ApiError(400, "Error in formidable !",err);
      }
      req.formFields = fields
      req.formFiles = files

    //   console.log('Result \n\n\n');
    //   console.log(fields,files, req.formFields,req.formFiles);
      
    //   console.log('\n\n\n');
      
    next()
    });
    
  } catch (error) {
    console.log("error in the middleware", error);

    return res
      .status(error.statusCode)
      .send(new ApiError(error.statusCode, error.message));
  }
};
