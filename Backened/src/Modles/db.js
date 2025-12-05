const mongoose=require('mongoose');
const { Schema } = mongoose; // Import Schema
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/userData');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
const UserSchema=new Schema({
    name:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true,
        unique:true
    },

    password:{
        type:String,
        required:true,
        
    }
})

const UserSchemaProfile=new Schema({
    photo :Buffer,//well it shoud be image usinng multer i guess
    name: String,
    skills: String,
    project: [{ project: String, github: String }],
    leetcode:String,
    linkedin:String,

})


const GroupSchema=new Schema({
    groupName:String,
})


const GroupModel=mongoose.model("GroupModel",GroupSchema);

const userProfileModel=mongoose.model("userProfileModel",UserSchemaProfile);

const UserModel=mongoose.model("UserModel",UserSchema);

//exporting both the models
//console.log("DB Connection State:", mongoose.connection.readyState);


module.exports={
    UserModel,
    userProfileModel,
    GroupModel
};