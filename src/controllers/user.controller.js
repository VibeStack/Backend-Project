import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  // get user details from frontend
  // validation (required fields, email related)
  // check if user already exist: username, email
  // check images
  // check for avatar
  // upload them to cloudinary, avatar check at cloudinary + multer
  // create user object -  create entry in db
  // remove password and refresh token field for response
  // check for user creation
  // return res

  const { username, email, fullName, password } = req.body;
  console.log({
    username: username,
    email: email,
    fullName: fullName,
    password: password,
  });

  /* if (fullname === "") {
    throw new ApiError(400,"Full Name is required!")
  } */

  if (
    [fullName, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All field are required!");
  }

  const existingUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existingUser) {
    throw new ApiError(409, "User Already Exist!");
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar field is required!");
  }

  const avatar = await uploadCloudinary(avatarLocalPath);
  const coverImage = await uploadCloudinary(coverImageLocalPath);

  if (!avatar) {
    throw new ApiError(400, "Avatar field is required!");
  }

  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });

  const isUserCreated = await User
    .findById(user._id)
    .select("-password -refreshToken");

  if (!isUserCreated) {
    throw new ApiError(500, "Something went wrong while registering the user!");
  }

  return res.status(201).json(
    new ApiResponse(200,isUserCreated,"User Registered Successfully!")
  )

});

export { registerUser };
