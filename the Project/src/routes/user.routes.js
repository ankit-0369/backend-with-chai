import { Router } from "express";
import { loginUser, logoutUser, registerUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router= Router()

router.route('/register').post(
    upload.fields([
        {
            name: "avatar", //this should match exactly with the variable defined in the data model
            maxCount: 1,
        },
        {
            name: "coverImage",
            maxCount: 1,
        }
    ]),
    registerUser)

router.route('/login').post(loginUser)

//secured routes

router.route('/logout').post( verifyJWT, logoutUser)




export default router


// router.route('/').get((req, res) => {
//     res.json({
//         message: "direct route data"
//     })
// })