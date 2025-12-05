const UserModel = require("../Modles/db");
const tommy = require("jsonwebtoken");
const JWT_SECRET = "secrete-123";
const bcrypt = require("bcrypt");
const multer = require("multer")
const upload = multer();


const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await UserModel.UserModel.findOne({ email });
        if (user) {
            return res.status(409)
                .json({ message: "record already exist", success: false });
        }
        const usermodel = new UserModel.UserModel({ name, email, password });
        usermodel.password = await bcrypt.hash(password, 10);//why they are making here the new model when it is already there 
        await usermodel.save();
        res.status(201)
            .json({
                message: "sing up successful",
                sucess: true
            })

    } catch (err) {
        res.status(500)
            .json({ message: "internal server error", success: false });
        console.log(err)

    }

}



const login = async (req, res) => {
    try {
        console.log("control is in login fucntion")
        const { email, password } = req.body;
        const user = await UserModel.UserModel.findOne({ email });
        if (!user) {
            return res.status(409)
                .json({ message: "user don't exist", success: false });
        }
        const isPassEqual = await bcrypt.compare(password, user.password);
        if (!isPassEqual) {
            return res.status(403)
                .json({ message: "email or password is wrong", success: false });
        }

        //now create a jwt token because the previous test has been passed 
        const jwtToken = tommy.sign({ email: user.email, _id: user._id },
            JWT_SECRET,
            { expiresIn: '24h' }

        )
        res.status(201)
            .json({
                message: "Login successful",
                success: true,
                jwtToken,
                email,
                name: user.name
            })



    } catch (err) {
        res.status(500)
            .json({ message: "internal server error", success: false });
        console.log(err)

    }

}

const userProfile = async (req, res) => {
    try {
        console.log(req.body)
        const { name, skills, leetcode,linkedin } = req.body;
        const project = JSON.parse(req.body.project);
        const photo = req.file.buffer;
        console.log(req.file.buffer)
        /*if (req.body && req.file) {
            res.json({
                message: "profile is recieved in controller",
                success: "true"
            })
            console.log("controller mai no problem")
        }
        else{
            res.json({
                message: "profile is  not recieved in controller",
                success: "false"
            })
            console.log("controller mai problem")

        }*/
        const Profile = new UserModel.userProfileModel({ photo, name, skills, project, leetcode, linkedin });

        const modelSaved = await Profile.save();
        if (modelSaved) {
            res.json({ message: "data has been saved successfully", success: true });
        } else {
            res.json({ message: "not saved sucessfully", success: false });
        }

    } catch (err) {
        console.log(err)
        res.json({ message: "profile server failed to respond", success: false });


    }

}


const deleteUserProfile = async (req, res) => {
    console.log("funciton reached router")

    try {
        const deleteProfile = await UserModel.userProfileModel.deleteMany({});
        console.log("fucntionis wroking")
        if (deleteProfile.deletedCount > 0) {
            res.json({ success: true, message: "You can edit you rprofile", success: true });

        } else {
            res.json({ success: false, message: "No profile existed", success: false });
        }

    } catch (err) {
        res.json({ message: "deleteprofile server error", success: false })

    }

}

const cancelRegistration = async () => {
    try {
        console.log("enterd the try block of unregister")
        const result = await UserModel.UserModel.deleteMany({})
        console.log("fucntion executed successfuly")

    } catch (err) {
        console.log(err);

    }

}

const getProfileData = async (req, res) => {

    try {
        console.log("enterd get profile block")
        const result = await UserModel.userProfileModel.find({});
        console.log(result)
        if(result.length>0){
            return res.json({ message: "data has been fetched successfully", success: true, result });
        }
        else{
            return res.json({ message: "data has not been fetched successfully", success: false });
        }

    } catch (err) {
        console.log(err);

    }

}

const getLogData= async(req,res)=>{
    try{
        console.log("entered get log fucntion")
        const logResult=await UserModel.UserModel.find({})
        res.json(logResult);

    }catch(err){
        console.log("fail to enter the get log fucntion ",err)

    }

}
const createGroup=async(req,res)=>{
    try{
        console.log("entered create group fucntion")
        const {groupName}=req.body;
        console.log(groupName)
        const groupModel=new UserModel.GroupModel({groupName});
        const result=await groupModel.save();
        if(result){
            return res.json({message:"group has been created successfully",success:true})
        }
        else{
            res.json({message:"group has not been created successfully",success:false})
        }
            

    }catch(err){
        console.log("fail to enter the create group fucntion ",err)

    }

}   

const getGroupData=async(req,res)=>{
    try{
        console.log("entered get group fucntion")
        const groupResult=await UserModel.GroupModel.find({})
        res.json({success:true, groupResult});

    }catch(err){
        console.log("fail to enter the get group fucntion ",err)

    }

}

module.exports = {
    signup,
    login,
    userProfile,
    deleteUserProfile,
    cancelRegistration,
    getProfileData,
    getLogData,
    createGroup,
    getGroupData    
};