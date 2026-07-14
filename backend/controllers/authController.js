// import req packges, files

const User = require("../models/user");
const ErrorHandler = require("../utils/errorHandler");
const  catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const sendToken = require("../utils/sendToken");
const cloudinary = require("../config/cloudinary");

//SignUp
exports.signup = catchAsyncErrors(async (req, resizeBy, next) => {
    const { name, email, password, passwordConfirm, phoneNumber } = req.body;
    
    let avatar = [];
    //avatar not provided
    if (!req.body.avatar || req.body.avatar === "/images/images.png") {
        avatar = {
            public_id: "default",
            url: "/images/images.png"
        };
    } 
    else {
        const result = await cloudinary.UploadStream(req.body.avatar, {
            folder: "avatar",
            width: 150,
            crop: "scale"
        });
        avatar = {
            public_id: result.public_id,
            url: result.url
        };
    }

    const user = await User.create({
        name, 
        email, 
        password, 
        passwordConfirm, 
        phoneNumber,
        avatar
    });

    sendToken(user, 200, res);
});
