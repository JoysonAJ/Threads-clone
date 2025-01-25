import { ApiError } from "../utils/ApiError.js";

export const testController = async (req, res) => {
  try {
    return res.status(200).json({ message: "testing successful" });
  } catch (error) {
    return res
      .status(error.statusCode)
      .send(new ApiError(error.statusCode, error.message));
  }
};
