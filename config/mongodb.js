const mongoose = require('mongoose')
const connectDb = async () => {
  try {
    mongoose.set('strictQuery', false)
    const conn = await mongoose.connect(process.env.MONGO_URI)
    console.log(`Database connected: ${conn.connection.host}`)
  } catch (error) {
    console.log('Failed to connect to db' , error)
  }
}
module.exports = connectDb