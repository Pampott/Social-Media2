import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";

//Routes
import AuthRoute from "./routes/AuthRoute.js";
import UserRoute from "./routes/UserRoute.js";
import PostRoute from "./routes/PostRoute.js";


//Middleware
const app = express();
app.use(bodyParser.json({limit: "30mb", extended: "true"}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: "true"}));

dotenv.config();


mongoose.connect(process.env.MONGO_DB)
    .then(() => app.listen(process.env.PORT, () => console.log("Listening on port " + process.env.PORT)))
    .catch((error) => console.log(error));

//usage of routes
app.use("/auth", AuthRoute);
app.use("/user", UserRoute);
app.use("/posts", PostRoute)