
import express from "express"
import mongoose from "mongoose"
import { DB_NAME } from "../constants.js"
const app = express()
const connectToDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        app.on("error", (error) => {
            console.log("mongodb in not connect!")
        })
    } catch (error) {
        process.exit(1)
    }
}

export default connectToDB


// const connectToDB = () => {
//     return mongoose.connect("mongodb://127.0.0.1:27017/onlineTest")
// }

// ;(async ()=>{
//     try {
//         await mongoose.connect("")
//         app.on("error",(error)=>{
//             console.log("error")
//             throw error
//         })
//         app.listen(process.env.PORT||3000,(error)=>{
//             console.log("server listen on port",process.env.PORT);
//         })
//     } catch (error) {
//         console.log("error",error)
//         throw error
//     }
// })();

