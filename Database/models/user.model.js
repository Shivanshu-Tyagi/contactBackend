const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : [true, 'Email already exists']
    },
    mobile : {
        type : Number,
        required : true,
        minlength : 10,
        maxlength : 10
    },
    password : {
        type : String,
        required : true
    }
},
{
    timestamps : true
})

userSchema.pre('save' , async function(next){
    if(!this.isModified('password')){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password , salt);
})

userSchema.methods.matchPassword = async function(password){
    return await bcrypt.compare(password , this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;