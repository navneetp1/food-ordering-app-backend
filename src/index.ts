import express, { Request, Response } from 'express'
import cors from 'cors'
import "dotenv/config"
import mongoose from 'mongoose'
import myUserRoute from "./routes/MyUserRoute"
import myRestaurantRoute from './routes/MyRestaurantRoute'
import restaurantRoute from "./routes/RestaurantRoute"
import { v2 as cloudinary } from "cloudinary"
import orderRoute from "./routes/OrderRoute"

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string).then(() => {
    console.log("connected to database!")
})

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})
 
const app  = express()

app.use(cors())
// app.use(urlencoded())

app.use("/api/order/checkout/webhook", express.raw({ type: "*/*" })) //instead of encrypting in json, seperately done for stripe

app.use(express.json())

// a message that indicates that the server is healthy and functional
app.get("/health", async( req: Request, res: Response ) => {
    res.send({ message: "Health Ogey!!!"})
})

app.use("/api/my/user", myUserRoute);
app.use("/api/my/restaurant", myRestaurantRoute)
app.use("/api/restaurant", restaurantRoute)
app.use("/api/order", orderRoute)

app.listen(7000, () => {
    console.log("Server listening on port:7000!")
})