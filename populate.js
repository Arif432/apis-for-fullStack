require('dotenv').config()
const connectDB = require('./db/connect.js')
const prodModel = require('./models/product.js')
const jsonDATA = require('./products.json')

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        await prodModel.deleteMany()
        await prodModel.create(jsonDATA)
        console.log("success");
        process.exit(0)
    }
    catch (err) {
        console.log(err)
        process.exit(1)

    }
}

start()