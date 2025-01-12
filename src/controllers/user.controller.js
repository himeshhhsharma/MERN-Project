import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { APIResponse } from "../utils/apiResponse.js";
// import { application } from "express";

const registerUser = asyncHandler(async (req, res) => {
  // get user detail from front end
  // validation of all data-> not empty, incorrect
  // check if user already exists
  // check for images,avatar
  // upload them to cloudinary
  // create user object- create entry in db
  // remove password and refresh token field from response
  // check for user creation
  // return response

  // taking data from req.body, destructuring them
  const { fullName, email, username, password } = req.body;
  // console.log("email", email);

  // validation for all fields, if any field is empty or not, these all are required fields
  if (
    [fullName, email, username, password].some((field) => field?.trim() == "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  // we can check all fields like this also
  // if(fullName===""){
  //   throw new ApiError(400,"Full Name is required");
  // }

  // check if user already exists or not
  // either email or username, if exists in the db
  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (existedUser) {
    throw new ApiError(409, "User with same username or email already exists");
  }

  // check if images are there
  // Tips: As we are getting data from req.body, now humne kyonki ek middleware add kr diya hai route mai( multer upload waala) to middlewares, generally request mai aur fields add kr deta hai, here multer gives us acces of req.files

  // yeh pathserver ka hai, abhi cloudinary pr nhi gya hai
  const avatarLocalPath = req.files?.avatar[0]?.path;
  // const coverImageLocalPath = req.files?.coverImage[0]?.path;

  let coverImageLocalPath;
  if (
    req.files &&
    Array.isArray(req.files.coverImage) &&
    req.files.coverImage.length > 0
  ) {
    coverImageLocalPath = req.files.coverImage[0].path;
  }

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }

  // check if uploaded on cloudinary or not, and avatar is required field
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatar) {
    throw new ApiError(400, "Avatar file is required");
  }

  // make entry in database of object
  const user = await User.create({
    fullName,
    avatar: avatar.url,
    // we are not sending complete response from uploadOnCloudinary, just the url we are putting in db
    coverImage: coverImage?.url || "",
    //  coverImag hai to url lelo, nhi to empty rehne do
    username: username.toLowerCase(),
    email,
    password,
  });

  // User.findById, will return the user document if found, and exculding some fields, password, and refreshToken.
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  // check if user is created or not
  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  // returning the response
  return res
    .status(201)
    .json(new APIResponse(201, createdUser, "User Registered Successfully"));
});
export { registerUser };
