import dotenv from "dotenv"
import connectToDB from "./db/index.js"
import { server } from "./app.js";
dotenv.config({
  path: "../env",
});
connectToDB().then(() => {
  server.listen(process.env.PORT || 3000, () => {
    console.log("sever listen on port : 3000");
  })
}).catch((error) => {
  console.log("error in index.js");
})
