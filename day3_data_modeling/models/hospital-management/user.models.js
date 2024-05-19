import mongoose from "mongoose";


const addressSchema= new mongoose.Schema({
    addressLine: {
        type: String,
        required: true,
    },
    pin: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
   
})


const userSchema= new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    email: {
        type: String,

    },
    phone: {
        tpye: Number,
        required: true,
    },

    address: {
        type: [addressSchema],
        required: true,
       },
    avatar: {
        type: String,
        
    }


}, {timestamps: true})

export const User= mongoose.model('User', userSchema)