const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const connectDB = require("./config/db");
const userRouter = require('./routes/userRouter');
// const User = require("./model/User");

const app = express();

dotenv.config();
const Port = process.env.PORT || 4000;

connectDB();

app.use(cookieParser());
app.use(express.json());
app.use(cors());

// const userInput = {
//     username : "Raju",
//     password : "12345",
//     role : "user"
// }

// const user = new User(userInput);

// user.save((err, document) => {
//     if(err)
//         console.log(err);
//     else
//         console.log(document);
// });

app.use("/user", userRouter);

app.listen(Port, () => {
    console.log(`Server running on Port http://localhost:${Port}`);
});