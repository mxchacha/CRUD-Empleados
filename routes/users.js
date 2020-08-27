const express=require('express');
const router=express.Router();
const User = require('../models/user.model');

router.get('/users/signin',(req,res)=>{
    res.render('users/signin');
});

router.get('/users/signup',(req,res)=>{
    res.render('users/signup');
});

router.post('/users/signup',(req,res)=>{
  const{name,email,password,confirm_password}=req.body;
  console.log(res.body);
    
    if (password != confirm_password) {
        errors.push({ text: "Las Contraseñas no son iguales." });
      }
      if (password.length < 4) {
        errors.push({ text: "Passwords debe tener mas de 4 caracteres." });
      }
      if (errors.length > 0) {
        res.render("users/signup", {
          errors,
          name,
          email,
          password,
          confirm_password
        });
    }else{
            const usuario = new User();
            usuario.name=req.body.name;
            usuario.email=req.body.email;
            usuario.password=req.body.password;
            usuario.confirm_password=req.body.confirm_password;
            usuario.save();
            req.flash('succes_msg','Registro exitoso');
            res.redirect('/users/signin');
        }});
 
module.exports=router;