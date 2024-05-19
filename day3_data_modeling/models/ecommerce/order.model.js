import mongoose from "mongoose";

const orderItemSchema= new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,

    },
      
    quantity: {
        type: Number,
        required: true,
        default: 0,
    }
})


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
    Landmark: String
})

const orderSchema= new mongoose.Schema({
    
   orderPrice: {
    type: Number,
    required: true,
   },
   customer:  {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
   },
   quantity: {
    type: Number,
    default: 0
   },
   ordereredItems: {
    type: [orderItemSchema],
    required: 0
   },
   address: {
    type: [addressSchema],
    required: true,
   },
   status: {
    type: String,
    enum: ["PENDING", "CANCELLED", "DELIVERED", "ONTHEWAY"],
    default: "PENDING",
   }

}, {timestamps: true})

export const Order= mongoose.model("Order", orderSchema)