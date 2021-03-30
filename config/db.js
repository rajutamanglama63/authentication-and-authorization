const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = async (req, res) => {
    try {
        await mongoose.connect(process.env.Mongo_URI, {
            useNewUrlParser : true,
            useFindAndModify : true,
            useCreateIndex : true,
            useUnifiedTopology : true
        });
        console.log("MongoDB connection established...");
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDB;