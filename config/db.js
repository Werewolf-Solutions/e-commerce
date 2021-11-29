const mongoose = require('mongoose')

const {
  MONGO_USERNAME,
  MONGO_PASSWORD,
  MONGO_HOSTNAME,
  MONGO_DB_NAME
} = process.env

var url

if (process.env.NODE_ENV === 'production') {
  url = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}/${MONGO_DB_NAME}?retryWrites=true&w=majority`
}else if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'production-test') {
  url = 'mongodb://localhost:27017/e-commerce'
}

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    console.log(`MongoDB Connected: ${conn.connection.host} in ${process.env.NODE_ENV}`)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

module.exports = connectDB