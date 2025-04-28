import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import AuthRoute from "./routes/auth.route.js";
import userRoute from "./routes/user.route.js";
import postRoute from "./routes/post.route.js";
import chatRoute from "./routes/chat.route.js";
import messageRoute from "./routes/message.route.js";

const app = express();

app.use(cors({origin:process.env.CLIENT_URL,credentials:true}));
app.use(express.json());
app.use(cookieParser());


app.use("/api/auth",AuthRoute);
app.use("/api/users",userRoute);
app.use("/api/posts",postRoute);
app.use("/api/chats",chatRoute);
app.use("/api/messages",messageRoute);



app.listen(8080,()=>{
    console.log("this server running at 8080");
})