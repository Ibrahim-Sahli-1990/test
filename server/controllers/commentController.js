const Commnet = require('../models/Comment')


const addcomment=async(req,res)=>{
    try {
      //  console.log(req.body)
    const {owner,postid,body}=req.body
 const newcomment =new Commnet({
owner:owner,postid:postid,body:body 
 })
        const savedcommnet= await newcomment.save()
    res.status(201).json(savedcommnet)
} catch (error) {
    res.status(400).json({ err: err.message })

}

}
const getcomment=async(req,res)=>{
   // console.log(req.body)

try {
    const thecomment=await Commnet.find({postid:req.body.postid})
    .sort({ 'createdAt': 1 })

    //.populate({path:"postid"})
    .populate({path:"owner" ,select: "firstname image lastname email _id role "})
    res.status(200).json(thecomment)
   // console.log("the comment is ",thecomment) 
    
} catch (err) {
    res.status(400).json({ err: err.message })

}


}


 

module.exports = { addcomment,getcomment}