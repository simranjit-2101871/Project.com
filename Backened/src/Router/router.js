const { signup, login,userProfile, deleteUserProfile ,cancelRegistration,getProfileData,getLogData,createGroup,getGroupData} = require('../Controller/controller');
const { signUpValidation, logInValidation } = require('../Middleware/validation');
const uploadMulter=require("../Middleware/upload");

const multer = require("multer");
const upload = multer();

const router=require('express').Router();




//ab yahan par contriller lo call karne se pahle hum validation ko add kar lenge
console.log("router is reached")
router.post('/Signin',signUpValidation,signup);
router.post('/Login',logInValidation,login);
router.post('/setProfile',upload.single("photo"),userProfile);
router.delete('/editProfile',deleteUserProfile);
router.get('/getUserProfile',getProfileData)
router.get('/getLogin',getLogData)
router.post('/createGroup',upload.none(),createGroup);
router.get('/getGroupData',getGroupData)

//user will be completely log out after the belwo steps are executed
router.delete('/logoutProfile',deleteUserProfile);
router.delete('/unRegister',cancelRegistration)

module.exports=router;