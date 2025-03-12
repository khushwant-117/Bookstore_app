const express = require("express");
const app  = express();
const cors  = require("cors");
require("dotenv").config();
require("./conn/conn");

const User = require("./routes/user");
const Books = require("./routes/book");
const Favourite = require("./routes/favourite");
const Cart = require("./routes/cart");
const Order = require("./routes/order");
app.use(cors());
app.use(express.json());
//routes
app.use("/ap1/v1", User);
app.use("/ap1/v1", Books);
app.use("/ap1/v1", Favourite);
app.use("/ap1/v1", Cart);
app.use("/ap1/v1", Order);
//creating port 
app.listen(process.env.PORT,()=>{
    console.log(`Server started at port ${process.env.PORT}`);
});
