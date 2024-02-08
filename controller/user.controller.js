const User = require("../Database/models/user.model");
const validator = require("validator");
const jwt = require("jsonwebtoken");
 
const generateToken = (id) => {
    return jwt.sign({id} , process.env.SECRETE_KEY , {expiresIn : "1d"});
}

exports.register = async (req, res) => {
 const {name , email , mobile , password} = req.body;

 if(!name || !email || !mobile || !password){
    return res.json({
        status : "failed",
        message : "All fields are required"
    })
 }

 const existingUser = await User.findOne({email});

 if(existingUser){
    return res.json({
        status : "failed",
        type : "email",
        message : "User already exists"
    })
 }

 if(!validator.isEmail(email)){
    return res.json({
        status : "failed",
        type : "email",
        message : "Invalid email"
    })
 }

 if(!validator.isMobilePhone(mobile)){
    return res.json({
        status : "failed",
        type : "mobile",
        message : "Invalid mobile number"
    })
 }
 if(mobile.toString().length !== 10){
    return res.json({
        status : "failed",
        type : "mobile",
        message : "Invalid mobile number"
    })
 }

 if(!validator.isStrongPassword(password)){
    return res.json({
        status : "failed",
        type : "password",
        message : "Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character"
    })
 }
 
 
 const newUser = new User({
    name,
    email,
    mobile,
    password
 })
 try {
   const savedUser = await newUser.save();
   const token = generateToken(savedUser._id);
   return res.json({
        user : savedUser,
        token,
        status : "success",
        message : "User created successfully"
    })
 } catch (error) {
   return res.status(500).json({ 
        status : "failed",
        type : "server",
        message : "Internal server error"
    })
 }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            return res.json({
                status: "success",
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id),
            });
        } else {
            return res.status(401).json({
                status: "failed",
                message: "Invalid email or password"
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: "failed",
            message: "Internal server error"
        });
    }
};