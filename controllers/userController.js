var User=require('../models/user')
var {check,validation}=require("express-validator")
const bcrypt=require('bcrypt')
exports.sign_up_get=(req,res)=>{
    res.render('signup',{title:signup})
}

exports.sign_up_post=[
    check('first_name').not().isEmpty().trim().escape(),
    check('last_name').not().isEmpty().trim().escape(),
    check('username').not().isEmpty().trim().escape(),
    check('password').not().isEmpty().trim().escape(),
    check('confirmpassword').not().isEmpty().trim().escape().custom((value,{req})=>value===req.body.password).withMessage('password donot match'),

(req,res,next )=>{
    const errors=validation(req)
    if(!errors.isEmpty()){
        req.render('/signup',{title:signup, errors:errors.array()})
        return
    }
    bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {

        if(err) console.log(err);
    
        else{
    
          let member;
    
          req.body.passcode === '123456' ? member = "member":member="user";
    
          if(req.body.admincode === 'admin')  member = "admin";
    
          const user = new User({
    
            first_name: req.body.first_name,
    
            last_name: req.body.family_name,
    
            username: req.body.username,
    
            password: hashedPassword,
    
            membership: member,
    
          })
          user.save(err =>{
    
            if(err){
    
              return next(err);
    
            }
    
          });
    
          res.redirect('/catalog');
    
        }
    
      })
    

}

]