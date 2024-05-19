const mongoose= require('mongoose')

const subtodoSchema= new mongoose.Schema(
    {
        content: {
            type: String,
            required: true,

        },
        completed: {
            type: String,
            default: false,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    }, {timestamps: true})

export const SubTodo= mongoose.model("SubTodo", subtodoSchema)
