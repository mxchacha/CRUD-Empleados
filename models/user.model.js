const mongoose = require('mongoose');
const bcrypt=require('bcryptjs');
const {Schema}=mongoose;

const UsersSchema= new Schema({
    name:{ 
        type:String, 
        requiere: true},
    email:{
        type:String, 
        requiere: true},
    password:{
        type:String, 
        requiere: true},
    date:{
        type:Date, 
        default:Date.now}
});

UsersSchema.methods.encrypPassword=(password)=>{
    const salr= bcrypt.genSalt(10);//Indica cuantas vece se ejecuta ese hash
    const hash =bcrypt.hash(password,salt);
    return hash;
};

UsersSchema.methods.matchPassword=function (password){
    return bcrypt.compare(password,this.password);//Compara las contrase;as
}

module.exports=mongoose.model('User',UsersSchema);