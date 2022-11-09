import UserModel from "../models/userModel.js";
import bcrypt from "bcrypt";

//New User Registration
export const signup = async (req, res) => {
  const { username, password, email, firstName, lastName } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const newUser = new UserModel({
    username,
    password: hash,
    email,
    firstName,
    lastName,
  });

  try {
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Login existing user

export const login = async (req, res) => {
    const {username, password} = req.body;

    try {
        const user = await UserModel.findOne({username: username});
        if(user) {
            const validity = await bcrypt.compare(password, user.password);

            validity ? res.status(200).json(user) : res.status(401).json({message: "Identifiants incorrects."});
        }
        else {
            res.status(404).json({message: "Utilisateur inconnu."})
        }
    } catch (error) {
        
    }
}
