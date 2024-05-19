import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
    {
        userDetails: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        specialization: {
            type: String,
            required: true,

        },
        age: {
            type: Number,
            default: 0,
        },
        DOB: {
            type: String,
            required: true,
        },


    }, { timestamps: true })

export const Doctor = mongoose.model("Doctor", doctorSchema)