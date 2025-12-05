const multer = require("multer");
const upload = multer();

/*
const express=require('express')
const app=express();

app.post("/endpoint",upload.single("name"),(req,res)=>{
    res.json({message:"multer test passed"});
})

module.exports=upload;
*/ //this is not required becuase router is using post method

//instead we will use a fucntion

/*const uploadMulter= async (req,res)=>{
    const result= await upload.single("photo")
    if(result){
        res.json({message:"upload test passed",success:true})
    }else{
        res.json({message:"upload test falied",success:false})
    }
}*/

const uploadMulter = (req, res) => {
    const result = upload.single("photo");
    console.log(result);
    if (!result) {
        res.json({ message: "Upload failed", success: false });
        console.log("multer mai problem")
       

    }
    else {
        res.json({ message: "Upload test passed", success: true, file: req.file });
        console.log("multer mai no problem")
    }


};


module.exports = uploadMulter;
