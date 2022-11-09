import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        isAdmin: {
          type: Boolean,
          default: false  
        },
        profilePicture: String,
        coverPicture: String,
        age: Number,
        followers: [],
        followings: []
    },
    {timestamps: true}
)

const UserModel = mongoose.model("Users", UserSchema);
export default UserModel;