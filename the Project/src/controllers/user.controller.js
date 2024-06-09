import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/apiResponse.js";
import jwt from 'jsonwebtoken'

const registerUser = asyncHandler(async (req, res) => {
    console.log("req.files is here :: ", req.files)
    const { username, fullName, email, password } = req?.body
    console.log(username, fullName, email, password)
    if([username, fullName, email, password]
        .some((field) =>  field === undefined || field?.trim() === "" )
    ){
        console.log("All fields required but some fields are missing \n");
        throw new ApiError(400, `All fields required but some fields are missing`);
    }


     //we can apply validations functions  here to email, username, password

    const existedUser = await User.findOne({
        $or: [{ email }, { username }]
    })

    if (existedUser) {
        throw new ApiError(409,
            `given ${existedUser.email === email ? 'email' : 'username'} already exist.`)
    }
        console.log("files :: ", req.files)
    const avatarLocalPath = req.files?.avatar[0]?.path || null;
    // const coverImageLocalPath = req.files?.coverImage[0]?.path;
    let coverImageLocalPath;
    if(req.files && req.files.coverImage)
        coverImageLocalPath= req.files?.coverImage[0]?.path;

    if (!avatarLocalPath) throw new ApiError(400, "Avatar file is required")

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)


    const user = await User.create({
        username,
        fullName,
        email,
        password,
        avatar: avatar?.url,
        coverImage: coverImage ? coverImage.url : "",

    })

    const createdUser = await User.findById(user?._id).select(
        ["-password -refreshToken"]
    )

    if (!createdUser) throw new ApiError(500, "something went wrong while creating user in the database")

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    )

})


/*
        Steps to Login----
        1. Take {username, email, password} from req.
        2. Find the user.
        3. Check for password correct or not.
        4. Login the user i.e. tokens need to be used.
    */

const generateAccessAndRefreshToken= async(userId)=>{

    const user= await User.findById(userId)
    const accessToken=  user.generateAccessToken()
    const refreshToken=  user.generateRefreshToken()
    user.refreshToken= refreshToken
    await user.save({validateBeforeSave: false})

    return {
        accessToken,
        refreshToken
    }
}
const loginUser= asyncHandler( async(req, res) =>{
    const {username, email, password}= req.body;
    console.log(username, email, password, req.body)
    if(!username && !email)
         throw new ApiError(500, 'username or email is required for login');

    const user= await User.findOne({
        $or: [{email}, {username}]
    })

    if(!user){
        throw new ApiError(404, 'User with given email/username not registered');
    }

    const isPasswordValid= await user.isPasswordCorrect(password)
    if(!isPasswordValid){
        throw new ApiError(401, 'Password is incorrect');
    }

    const {accessToken, refreshToken}= await generateAccessAndRefreshToken(user._id)
    const loggedInUser= await User.findById(user._id).select(
        ["-password -refreshToken"]
    )

    const options= {
        httpOnly: true,
        secure: true
    }



    res
    .status(200)
    .cookie("accessToken",accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            201,
            {user: loggedInUser, accessToken, refreshToken},
            'User LoggedIn successfully'
        )
    )
    
})

const refreshAccessToken= asyncHandler( async(req, res)=>{

    const incomingToken= req.cookies.refreshToken || req.body.refreshToken;
    if(!incomingToken){
        throw new ApiError(401, "Unauthorized access")
    }

    const decodedToken= jwt.verify(incomingToken, process.env.REFRESH_TOKEN_SECRET)

    const user= await User.findById(decodedToken._id)
    if(!user) throw new ApiError(404, "Invalid refresh token")
    
    if(incomingToken !== user?.refreshToken){
        throw new ApiError(401, "Refresh token is expired")
    }

    const {accessToken, newRefreshToken}= await generateAccessAndRefreshToken(user?._id)
    const options= {
        httpOnly: true,
        secure: true
    }
    res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", newRefreshToken, options)
    .json(
        new ApiResponse(200,
            {accessToken, refreshToken: newRefreshToken},
            "token refresh successfully"
        )
    )
    
})

const logoutUser= asyncHandler( async(req, res)=>{

    const user= await User.findByIdAndUpdate(
        req.user?._id,
       {
         $unset: {
            refreshToken: 1
         }
       },
       {
        new: true
       } 
    )
    if(!user) throw new ApiError(500, 'Something went wrong while logging Out');
    const options= {
        httpOnly: true,
        secure: true
    }

    res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json( new ApiResponse(200, {}, 'User Logged Out successfully'))

})










export { 
    registerUser,
    loginUser,
    logoutUser
 }
/*Steps to register a user ---
    1. get data from req.
    2. wheather all fields are completed or not,  check for validations.
    3. chheck if user already exist or not.
    4. check for images, avatar given or not.
    5. upload it on cloudinary.
    6. create a user object for DB entry.
    7. remove the refresh token, password from the created object.
    8. return the final response.



*/



// const registerUser= (req, res) => {
//     res.status(200).json({
//         message: "checking without the asynchandler",
//         username: "alpha",
//         password: "asdmalkf"
//     })
// }
