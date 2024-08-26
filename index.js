import express from 'express'
import dotevn from 'dotenv'
import mongoose from 'mongoose'
import userRouter from './routes/users.routes.js'
import postRouter from './routes/posts.routes.js'
import authMiddleware from './middlewares/auth.middlewares.js'

dotevn.config()

const app = express()
app.use(express.json())

await mongoose.connect(process.env.MONGO_DB);
console.log('database connected')
app.use(authMiddleware.authentication)

app.use('/users', userRouter)

app.use('/posts', postRouter)

app.listen(process.env.PORT_DEVELOP, () => {
    console.log(`Server is running at http://localhost:${process.env.PORT_DEVELOP}`)
})