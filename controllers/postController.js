var Post=require('../models/post')

exports.index=(req,res)=>{
    Post.find()
    .then((data)=>{
 
        console.log(data)
        res.render("index",{post:data,title:"homepage"})
    })
}