import mongoose from 'mongoose'

// const MONGO_URL: string = 'mongodb://localhost:27017/tesis' // TODO: comment in PRODUCTION
const MONGO_URL: string = `mongodb://${process.env.APP_MONGO_USER}:${process.env.APP_MONGO_PASS}@database:27017/${process.env.APP_MONGO_DB}`

const mongodbConnection = async function (): Promise<void> {
  await mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  }, (error) => {
    if (error != null) {
      console.log("Cannot connect to the database", error)
      process.exit(1)
    }
  }).then(() => console.log("Connected to the database"))
}

export default mongodbConnection
