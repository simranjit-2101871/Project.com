const express=require("express");
const app=express();
const bodyParser=require("body-parser");
require('dotenv').config();
const cors=require("cors");
const router=require("./src/Router/router")
const port=process.env.port||8080;



//middlewares
//app.use(express.json());
console.log("index is reached")
app.use(bodyParser.json()); // For JSON data
app.use(express.urlencoded({ extended: true })); // For FormData (text fields only)
app.use(cors());

app.use('/auth',router);
app.use('/create',router);



// Global error-handling middleware (should be at the bottom)
/*app.use((err, req, res, next) => {
    console.error("Error:", err.message); // Log the error
    res.status(500).json({ message: err.message , success: false });
});*/



app.get('/ping',(req,res)=>{
    res.send("Pong");
})
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})