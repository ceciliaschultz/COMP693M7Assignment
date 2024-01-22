import mongoose from 'mongoose'
import { } from 'dotenv/config'

// mongoose
//     .connect(process.env.DB)
//     .then(() => console.log('connected to the database w mongoose..'))
//     .catch( (err) => console.log(err))

// a better way to do this, create a function,
// this will allow use to work with multiple connections if we need to
const connectDB = (url) => {
    return mongoose.connect(url)
}

export default connectDB // we need to export this so it is available to other modules