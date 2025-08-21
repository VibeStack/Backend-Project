import { asyncHandler } from "../utils/asyncHandler.js";

const registerUser = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "Hello Bro Arsh Here is the resonse comming!",
  });
});

export { registerUser };
