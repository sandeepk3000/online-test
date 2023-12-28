
import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import path from "path"
import hbs from "hbs"
import http from "http"
import { initializeSocket } from "./utils/socket.js"
const app = express()
const server = http.createServer(app)
initializeSocket(server)
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}))
app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))//, limit: "8000kb" }

app.use(express.static("public"))
const viewsPath = path.join("C:/Users/DES/Desktop/test/", "templates/views")
const partialsPath = path.join("C:/Users/DES/Desktop/test/", "templates/partials")
app.set("view engine", "hbs")
app.set("views", viewsPath)
hbs.registerPartials(partialsPath)
app.use(cookieParser())
import userRouter from "./routes/user.routes.js"
import questionPaperRouter from "../src/routes/question.paper.routes.js";
import testRouter from "./routes/test.routes.js"
import resultRouter from "./routes/result.routes.js"
import { isTestRequestValid } from "./middlewares/isTestRequestValid.middlewares.js"
console.log(path.basename);
app.use("/api/v1/student", userRouter);
app.use("/api/v1/teacher", userRouter)
app.use("/api/v1/paper", questionPaperRouter)
app.use("/api/v1/test", testRouter)
app.use("/api/v1/result", resultRouter)
app.get("/", (req, res) => {
  res.render("home")
})
app.get("/s", (req, res) => {
  console.log(req);
  res.render("student")
})
app.get("/t", (req, res) => {
  console.log(req.headers.referer);
  res.render("teacher")
})
console.log(new URL(".", import.meta.url
));
app.get("/testDashboard", isTestRequestValid, (req, res) => {
  console.log(req);
  res.render("test")
})
app.get("/createQuestion", (req, res) => {
  console.log(req);
  res.render("createQuestion")
})
app.get("/login", (req, res) => {
  console.log(req);
  res.render("login")
})
export { server }