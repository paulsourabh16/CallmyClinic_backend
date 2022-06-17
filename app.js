import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import connectDB from './backend/config/connectdb.js'
import cors from 'cors'
import authRoutes from './backend/routes/authRoutes.js'
import userRoutes from './backend/routes/userRoutes.js'
import roleRoutes from './backend/routes/roleRoutes.js'
import patientRoutes from './backend/routes/patientRoute.js'
import doctorRoutes from './backend/routes/doctorRoutes.js'
import appoinmentBookingRoutes from './backend/routes/appoinmentBookingRoutes.js'

const app = express()
const port = process.env.PORT
const DATABASE_URL = process.env.DATABASE_URL

//cors policy
app.use(cors())

//Database connection
connectDB(DATABASE_URL)

//JSON
app.use(express.json())

//Load Routes
app.use("/api/auth", authRoutes)
app.use("/api/user", userRoutes)
app.use("/api/role", roleRoutes)
app.use("/api/patient", patientRoutes)
app.use("/api/doctor", doctorRoutes)
app.use("/api/appoinmentBooking", appoinmentBookingRoutes)

app.listen(port, () => {
    console.log('Server listening at http://localhost:' + port)
})