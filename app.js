import express from 'express';
import mongoose from 'mongoose'
import blogRouter from './routes/blog-routes';
import router from './routes/user-routes';


const app = express()
app.use(express.json())
app.use('/api/user', router)
app.use('/api/blog', blogRouter)

mongoose.connect('mongodb+srv://abhishek:abhishek@cluster0.tfwdnut.mongodb.net/Social?retryWrites=true&w=majority')
.then(() => app.listen(5000))
.then(() => console.log('Connected to DB and Listening to Port 5000'))
.catch((err) => console.log(err))



