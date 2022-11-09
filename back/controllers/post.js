import PostModel from "../models/postModel.js";

//New post
export const createPost = async(req,res) => {
    const newPost = new PostModel(req.body);

    try {
        await newPost.save();
        res.status(201).json(newPost)
    } catch (error) {
        res.status(500).json(error)
    }
}

//Get Posts
export const getPosts = async(req,res) => {
    try {
        const posts = await PostModel.find()
        res.status(200).json(posts)
    } catch (error) {
        res.status().json(error)
    }
}

//Get single post
export const getSinglePost = async(req,res) => {
    const postId = req.params.id;

    try {
        const post = await PostModel.findById(postId);
        if(!post) {
            res.status(404).json({message: "Ce post n'existe pas."})
        }   else {
            res.status(200).json(post)
        }  
    } catch (error) {
        res.status(500).json(error)
    }
}
//Delete Post
export const deletePost = async(req, res) => {
    const postId = req.params.id;

    const post = await PostModel.findById(postId);
    const {currentUserId, currentAdminStatus} = req.body;

    if(currentUserId === post.posterId || currentAdminStatus) {
        try {
            await post.deleteOne();
            res.status(200).json({message: "Post supprimé !"})
        } catch (error) {
            res.status(500).json(error)
        }
    } else {
        res.status(403).json({message: "Vous n'êtes pas autorisé à effectuer cette action."})
    }
}

//Modify Post
export const updatePost = async(req,res) => {
    const postId = req.params.id;

    const {currentUserId} = req.body;

   try {
        const post = await PostModel.findById(postId)
        if(post.posterId === currentUserId) {
            await post.updateOne({$set: req.body});
            res.status(200).json("Post mis à jour avec succès !")
        } else {
            res.status(403).json({message: "Action non-autorisée"})

        }
   } catch (error) {
    res.status(500).json(error)
   }
}

//Like or Dislike a Post
export const likePost = async(req, res) => {
    const postId = req.params.id;
    const {currentUserId} = req.body;

    try {
        const post = await PostModel.findById(postId);

        if(!post) res.status(404).json({message: "Ce post n'existe pas"})

        if(!post.likes.includes(currentUserId)) {
            await post.updateOne({$push: {likes: currentUserId}})
            res.status(200).json({message: "Post liké"})
        } else {
            await post.updateOne({$pull: {likes: currentUserId}})
            res.status(200).json({message: "Post disliké"})
        }
    } catch (error) {
        res.status(500).json(error)
    }
}