import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"


const app = express();

app.use(cors({
    // origin: process.env.CORS_ORIGIN,
    origin: 'http://localhost:5173',
    credentials: true
}))



app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

import userRouter from "./routes/user.routes.js"
import testRouter from "./routes/test.routes.js"
import postRouter from "./routes/post.routes.js";
import commentsRouter from "./routes/comments.routes.js";



//routes declaration
app.use("/api/v1/users", userRouter)
app.use("/api/v1/testing", testRouter)
app.use("/api/v1/post", postRouter)
app.use("/api/v1/comments", commentsRouter)



export { app };
