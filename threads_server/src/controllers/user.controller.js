import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

/**
 * Controller for signing in a user.
 *
 * This function handles the user sign-in process, including validation of input fields,
 * checking for existing users, hashing the password, creating a new user, and generating
 * an access token. It also sets a cookie with the access token for session management.
 *
 * @async
 * @function signInUserController
 * @param {Object} req - The request object containing user input data.
 * @param {Object} res - The response object used to send responses to the client.
 * @returns {Promise<Object>} - Returns a response object with the status and user data
 *                              or an error message.
 *
 * @throws {ApiError} - Throws an ApiError if any validation fails or if there are issues
 *                      during user creation or token generation.
 */
export const signInUserController = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    // Validate that all fields are provided
    if ([userName, email, password].some((field) => field?.trim() === "")) {
      throw new ApiError(400, "All fields are required");
    }

    // Check if the email or username already exists in the database
    const existedUser = await User.findOne({
      $or: [{ userName }, { email }],
    });

    if (existedUser) {
      throw new ApiError(409, "User  with email or username already exists");
      // );
    }

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    if (!hashedPassword) {
      throw new ApiError(400, "Error in password hashing !");
    }

    // Create a new user in the database
    const user = await User.create({
      userName,
      email,
      password: hashedPassword,
    });

    // Retrieve the newly created user without the password and access token
    const result = await User.findById(user._id).select(
      "-password -accessToken"
    );

    if (!result) {
      throw new ApiError(400, "Error while saving user !");
    }

    // Generate an access token for the user
    const accessToken = jwt.sign(
      { token: result._id },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "30d",
      }
    );

    if (!accessToken) {
      throw new ApiError(400, "Error while generating token !");
    }

    // Set cookie options for the access token
    const cookieOptions = {
      maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
      httpOnly: true,
      sameSite: "none",
      secure: true,
      partitioned: true,
    };

    // Send response with user data and access token
    return res
      .status(200)
      .cookie("accessToken", accessToken, cookieOptions)
      .json(
        new ApiResponse(
          200,
          {
            user: result,
            accessToken,
          },
          "User  logged In Successfully"
        )
      );
  } catch (error) {
    return res
      .status(error.statusCode)
      .send(new ApiError(error.statusCode, error.message));
  }
};

/**
 * Controller for logging in a user.
 *
 * This function handles the user login process, including validation of input fields,
 * checking for existing users, verifying the password, and generating an access token.
 * It also sets a cookie with the access token for session management.
 *
 * @async
 * @function logInUserController
 * @param {Object} req - The request object containing user input data.
 * @param {Object} res - The response object used to send responses to the client.
 * @returns {Promise<Object>} - Returns a response object with the status and user data
 *                              or an error message.
 *
 * @throws {ApiError} - Throws an ApiError if any validation fails or if there are issues
 *                      during user authentication or token generation.
 */
export const logInUserController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate that both email and password are provided
    if (!password && !email) {
      throw new ApiError(400, "username and password is required");
    }

    // Check if the user exists in the database
    const existedUser = await User.findOne({ email });

    if (!existedUser) {
      throw new ApiError(400, "Please Signin first !");
    }

    // Compare the provided password with the stored hashed password
    const passwordMatched = await bcrypt.compare(
      password,
      existedUser.password
    );

    if (!passwordMatched) {
      throw new ApiError(400, "Incorrect credentials !");
    }

    // Generate an access token for the user
    const accessToken = jwt.sign(
      { token: existedUser._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30d" }
    );

    if (!accessToken) {
      throw new ApiError(400, "Token not generated in login!");
    }

    // Set cookie options for the access token
    const cookieOptions = {
      maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
      httpOnly: true,
      secure: true,
      sameSite: "none",
      partitioned: true,
    };

    // Retrieve the logged-in user without the password and refresh token
    const loggedInUser = await User.findById(existedUser._id).select(
      "-password -refreshToken"
    );

    // Send response with user data and access token
    return res
      .status(200)
      .cookie("token", accessToken, cookieOptions)
      .json(
        new ApiResponse(
          200,
          { user: loggedInUser },
          "User  logged in successfully !"
        )
      );
  } catch (error) {
    console.log("ERROR ___", error);

    // Send error response if any exception occurs
    return res
      .status(error.statusCode)
      .send(new ApiError(error.statusCode, error.message));
  }
};

/**
 * Retrieves the profile details of a user by their ID.
 *
 * @async
 * @function getProfileUserDetails
 * @param {Object} req - The request object from the client.
 * @param {Object} res - The response object to send data back to the client.
 * @throws {ApiError} Throws an error if the user ID is not provided or if an error occurs during the database query.
 * @returns {Promise<void>} Sends a JSON response containing the user details or an error message.
 */

export const getProfileUserDetails = async (req, res) => {
  try {
    const { id } = req.params; // Extracting the user ID from the request parameters
    if (!id) {
      throw new ApiError(400, "id is required !"); // Throwing an error if ID is not provided
    }

    // Fetching user details from the database, excluding the password and populating related fields
    const user = await User.findById(id)
      .select("-password") // Exclude the password field from the result
      .populate("followers") // Populate the followers field
      .populate({
        path: "threads", // Populate threads with likes, comments, and admin details
        populate: [{ path: "likes" }, { path: "comments" }, { path: "admin" }],
      })
      .populate({ path: "replies", populate: { path: "admin" } }) // Populate replies with admin details
      .populate({
        path: "reposts", // Populate reposts with likes, comments, and admin details
        populate: [{ path: "likes" }, { path: "comments" }, { path: "admin" }],
      });

    // Sending a successful response with the user details
    res
      .status(200)
      .json(new ApiResponse(200, { user }, "User  Details Fetched !"));
  } catch (error) {
    // Handling errors and sending an appropriate response
    return res
      .status(error.statusCode)
      .send(new ApiError(error.statusCode, error.message));
  }
};



/**
 * Allows a user to follow or unfollow another user based on their ID.
 *
 * @async
 * @function followTheUser
 * @param {Object} req - The request object from the client, containing user information and parameters.
 * @param {Object} res - The response object to send data back to the client.
 * @throws {ApiError} Throws an error if the user ID is not provided, if the user does not exist, or if any other error occurs.
 * @returns {Promise<void>} Sends a JSON response indicating the follow/unfollow status.
 */
export const followTheUser = async (req, res) => {
  try {
    const { id } = req.params; // Extracting the user ID from the request parameters

    // Check if the user ID is provided
    if (!id) {
      throw new ApiError(400, "Id is required !"); // Throwing an error if ID is not provided
    }

    // Checking if the user exists in the database
    const userExists = await User.findById(id);
    if (!userExists) {
      throw new ApiError(400, "User  don't Exist !"); // Throwing an error if the user does not exist
    }

    // Check if the current user is already following the target user
    if (userExists.followers.includes(req.user._id)) {
      // If already following, unfollow the user
      await User.findByIdAndUpdate(
        userExists._id,
        {
          $pull: { followers: req.user._id }, // Remove the current user's ID from the followers array
        },
        { new: true } // Return the updated document
      );

      // Sending a response indicating the user has been unfollowed
      return res.status(201).json(
        new ApiResponse(
          201,
          { user: req.user },
          `Unfollowed ${userExists.userName}` // Message indicating unfollow action
        )
      );
    }

    // If not following, follow the user
    await User.findByIdAndUpdate(
      userExists._id,
      {
        $push: { followers: req.user._id }, // Add the current user's ID to the followers array
      },
      { new: true } // Return the updated document
    );

    // Sending a response indicating the user is now being followed
    return res.status(201).json(
      new ApiResponse(
        201,
        { user: req.user },
        `Following ${userExists.userName}` // Message indicating follow action
      )
    );
  } catch (error) {
    // Handling errors and sending an appropriate response
    return res
      .status(error.statusCode)
      .send(new ApiError(error.statusCode, error.message));
  }
};
