import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import PostModel from "./models/Posts.js";
// import multer from "multer";
// import path from "path";
const app = express();

// const __dirname = path.resolve();
// app.use("/images", express.static(path.join(__dirname, "/images")));
app.use(cors());
app.use(express.json());

// const url =
//     "mongodb+srv://Mazen:Mazen123@cluster0.sbnha.mongodb.net/BlogApp?retryWrites=true&w=majority";
const url = "mongodb://"+process.env.IP+":27017/cloud";



mongoose
    .connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("database works fine");
    });
mongoose.connection.on("connected", () => {
    console.log("database connected");
});


app.get("/posts", async(req, res) => {
    const AllPosts = await PostModel.find({});
    res.send(AllPosts);
});


app.post("/addPost", async(req, res) => {
    
    const desc = req.body.desc;
    const title = req.body.title;


    const todo = new PostModel({
        title: title,
        desc: desc
       
    });
    await todo.save();

    res.send("new post added");
});

app.delete("/deletePost/:id", async(req, res) => {
    const id = req.params.id;
    await PostModel.findByIdAndDelete(id).exec();
    res.send("post is deleted");
});

app.put("/updatePost/:id", async(req, res) => {
    const newTitle = req.body.newTitle;
    const newDesc = req.body.newDesc;
    const id = req.params.id;
    await PostModel
        .findByIdAndUpdate(id, {
            title: newTitle,
            desc: newDesc
        })
        .exec();
});
app.get("/", (req, res) => {
    res.send("app is running test");
    //   const post = new PostModel({title:"second memory", desc: "eh el kalammm" });
    //   post.save();
});

app.listen(5000, (req, res) => {
    console.log("app running on port 5000");
});