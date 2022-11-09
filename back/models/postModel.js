import mongoose from "mongoose";

const postSchema = mongoose.Schema(
    {
    posterId: {type: String, required: true},
    description: {type: String},
    imageUrl: {type: String},
    likes: []
    },
    {timestamps: true}
)  

const PostModel = mongoose.model("Posts", postSchema);

export default PostModel;