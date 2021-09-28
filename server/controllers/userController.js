const User = require('../models/User')
const bcrypt = require('bcryptjs') 
const jwt = require('jsonwebtoken')
const config = require('config')
const { validationResult } = require('express-validator')
const cloudinary = require('../helpers/cloudianry')
const mongoose = require('mongoose')


const register = async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.mapped() })
        const { firstname, lastname, password, email, image } = req.body
        const user = await User.findOne({ email })
        if (user)
            return res.status(400).json({ errors: [{ msg: 'User exist !' }] })
        const newUser = new User({
            firstname,
            lastname,
            password,
            email,
        })
        //cryptage du password
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(newUser.password, salt)
        newUser.password = hash
        if (image) {
            const savedImage = await cloudinary.uploader.upload(image, {
                timeout: 60000,
                upload_preset: "Movie"
            })
            newUser.image = {
                url: savedImage.url,
                public_id: savedImage.public_id
            }
        }

        const registredUser = await newUser.save()
        const payload = {
            sub: registredUser._id
        }
        const token = await jwt.sign(payload, config.get("JWT_CONFIG.SECRET"))
        res.json({ token })

    }
    catch (err) {
        res.status(500).json({ errors: [{ msg: err.message }] })
    }
}

const login = async (req, res) => {
   // console.log("this is working")
    const { email, password } = req.body;
    try { 
        const errors = validationResult(req)
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.mapped() })

        const user = await User.findOne({ email:email })
        if (!user)
           { 
            return res.status(404).json({ errors: [{ msg: 'Please register before' }] })}

        if (user.isBanned) {
            return res.status(401).json({ err: "YOU ARE BANNED" })  
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch)
            return res.status(404).json({ errors: [{ msg: 'wrong password' }] })
        const payload = {
            sub: user._id
        }
        const token = await jwt.sign(payload, config.get("JWT_CONFIG.SECRET"))
        res.json({ token })

    } catch (err) {
        res.status(500).json({ errors: [{ msg: err.message }] })
    }
}

const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select({ password: 0, _v: 0 })
        res.json(user)
    }
    catch (err) {
        res.status(500).json({ errors: [{ msg: err.message }] })
    }
}
const getotheruser = async (req, res) => {
    try {
        const user = await User.findOne({ _id:req.params.id })
          res.json(user)
    }
    catch (err) {
        res.status(500).json({ errors: [{ msg: err.message }] })
    }
}
const updatingprofileimage =async(req,res)=>{
  
    try {  const image=req.body.image
        if (image) {
            const savedImage = await cloudinary.uploader.upload(image, {
                timeout: 60000,
                upload_preset: "Movie"
            })
            newimage = {
                url: savedImage.url,
                public_id: savedImage.public_id
            }
            const user = await User.findOne({ _id:req.userId })
            const public_id=user.image.public_id

        await cloudinary.uploader.destroy(public_id);
        const updatedprofile = await User.findByIdAndUpdate(req.userId, {image:newimage })
        res.json(updatedprofile)
         }}
    catch (err) {
        res.status(400).json({ errors: [{ msg: err.message }] })
    

}}

const alluser =async(req,res)=>{
try {
    const users = await User.find({_id:{$ne: req.userId}}).select({ password: 0, __v: 0 })
    res.json(users)
} catch (err) {
    res.status(400).json({ errors: [{ msg: err.message }] })

    
}
}



const connect=async(req,res)=>{
   try{ const updateduser = await User.findByIdAndUpdate(req.userId, {isconnected:true})
    res.status(200).json(updateduser) }
    catch(error){

        res.status(400).json(error)
    }
}

const disconnect=async(req,res)=>{
   // console.log("frommmmmm",req.body)
    try{ const updateduser = await User.findByIdAndUpdate(req.params.id, {isconnected:false })
     res.status(200).json(updateduser) }
     catch(error){
 
         res.status(400).json(error)
     }
 }
 const disconnectall=async(req,res)=>{
    // console.log("frommmmmm",req.body)
     try{ const updateduser = await User.updateMany({}, {isconnected:false }) 
      res.status(200).json(updateduser) }
      catch(error){
  
          res.status(400).json(error)
      }
  }
const addfreiend=async(req,res)=>{
   
   
   try {
       
       const user1=await User.findById(req.body.idx)
      
       const id=mongoose.Types.ObjectId(req.body.idy)
   //   const id=ObjectID(req.body.idy)
       user1.friends.push(id)
       updatedfriends=user1.friends 
       const updateduser=await User.findByIdAndUpdate(req.body.idx,{friends:updatedfriends})
      
       res.status(200).json(updateduser)

    } catch (err) { 
       console.log(err)
       
   }
}




module.exports = { updatingprofileimage,register, login, getotheruser,getUserProfile,alluser,addfreiend,connect,disconnect,disconnectall }  