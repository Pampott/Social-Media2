import UserModel from "../models/userModel.js";

//Get single user
export const getUser = async (req, res) => {
  const id = req.params.id;

  try {
      const user = await UserModel.findById(id);

      if(user) {
        const {password, ...othersDetails} = user._doc;
       res.status(200).json(othersDetails)
      }
      else {
        res.status(404).json("Utilisateur introuvable")
      };
  } catch (error) {
    res.status(500).json({error})
  };
};

//Update user
export const update = async(req,res) => {
    const id = req.params.id;
    const {currentUserId, currentAdminStatus, password} = req.body;

    if(id === currentUserId || currentAdminStatus){
        try {
            
            const user = await UserModel.findByIdAndUpdate(id, req.body, {new: true})

            res.status(200).json(user)
        } catch (error) {
            res.status(500).json({error})
            
        }
    } else {
        res.status(403).json("Accès refusé: vous ne pouvez modifier que votre propre profil.")
    }
}

//Delete user
export const deleteUser = async (req,res) => {
    const id = req.params.id;

    const {currentUserId, currentAdminStatus, password} = req.body;

    if(id === currentUserId || currentAdminStatus) {
        try {
            await UserModel.findByIdAndDelete(id)
            res.status(200).json({message: "Utilisateur supprimé avec succès."})
        } catch (error) {
            res.status(500).json(error)
        }
    } else {
        res.status(403).json({message: "Vous n'êtes pas autorisé à effectuer cette action"})
    }
}

//Follow a user
export const follow = async (req,res) => {
    const id = req.params.id;

    const {currentUserId} = req.body;

    if(currentUserId === id) {
        res.status(403).json({message: "Vous ne pouvez pas vous suivre vous-même."})

    } else {
        try {
            const followedUser = await UserModel.findById(id);
            const followingUser = await UserModel.findById(currentUserId);
            
            //push currentuserId if not already in followers table
            if(!followedUser.followers.includes(currentUserId)) {
                await followedUser.updateOne({$push: {followers: currentUserId}})
                await followingUser.updateOne({$push: {followings: id}})
                res.status(200).json({message: "Utilisateur suivi avec succès !"})
            }
            else {
                //Forbid followingUser to follow the same user
                res.status(403).json({message: "Utilisateur déjà suivi."})
            }
        } catch (error) {
            res.status(500).json(error)
        }
    }
}

//Unfollow user

export const unfollow = async(req, res) =>  {
    const id = req.params.id;

    const {currentUserId} = req.body;

    if(currentUserId === id) {
        res.status(403).json({message: "Vous ne pouvez pas vous suivre vous-même."})

    } else {
        try {
            const followedUser = await UserModel.findById(id);
            const followingUser = await UserModel.findById(currentUserId);
            
            //push currentuserId if not already in followers table
            if(followedUser.followers.includes(currentUserId)) {
                await followedUser.updateOne({$pull: {followers: currentUserId}})
                await followingUser.updateOne({$pull: {followings: id}})
                res.status(200).json({message: "Désabonnement effectué !"})
            }
            else {
                //Forbid followingUser to follow the same user
                res.status(403).json({message: "Désabonnement déjà effectué."})
            }
        } catch (error) {
            res.status(500).json(error)
        }
    }
}
