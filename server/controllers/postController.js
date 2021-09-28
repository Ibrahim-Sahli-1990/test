const Post = require('../models/Post')
const User = require('../models/User')

const cloudinary = require('../helpers/cloudianry')
const Commnet = require('../models/Comment')



const findposts=async(req,res)=>{

    try {
        const posts = await Post.find({$and:[{ name: {$regex: "^"+ req.name }},{rating:req.rating}]}).populate({ path: 'owner', select: "firstname image lastname email _id role " })

        res.json({posts})
    }
    catch (err) {
        res.status(400).json({ err: err })
    }
}



const addPost = async (req, res) => {
    try {
        const { description, image,name,rating,trailer } = req.body
        const newPost = new Post({
            description,
            owner: req.userId,
            name,rating,trailer
            
        })
        if (image) {
            const savedImage = await cloudinary.uploader.upload(image, {
                timeout: 60000,
                upload_preset: "Movie"
            })
            newPost.image = {
                url: savedImage.url,
                public_id: savedImage.public_id
            }
        }

        const savedPost = await newPost.save()
        res.json(savedPost)
    } catch (err) {
        res.status(400).json({ err: err.message })
    }


}

const getPosts = async (req, res) => {
    try {
        //let limit = +req.query.limit
       // let pageNumber = +req.query.page
        //let documentCount = await Post.find().countDocuments()
        //let numberTotalOfpages = Math.ceil(documentCount / limit);

        /*   if (numberTotalOfpages < documentCount / limit)
              numberTotalOfpages++ */
        //out of band verification
        //if (pageNumber > numberTotalOfpages)
          //  pageNumber = numberTotalOfpages
        /* if (pageNumber * limit > documentCount)
            limit = documentCount - ((pageNumber - 1) * limit) */

        const posts = await Post.find({})
            .select({ '__v': 0 })
            .sort({ 'createdAt': -1 })
            .populate({ path: 'owner', select: "firstname image lastname email _id role " })
            //.skip((pageNumber - 1) * limit)
            //limit(limit)
 
        res.json({ posts })
    }
    catch (err) {
        res.status(400).json({ err: err.message }) 
    }
}
const getMyPosts = async (req, res) => {
    try {
        const posts = await Post.find({ owner: req.userId }).populate({ path: 'owner', select: "firstname image lastname email _id role " })

        res.json(posts)
    }
    catch (err) {
        res.status(400).json({ err: err })
    }
}

const getotherposts = async (req, res) => {
    try {

        const posts = await Post.find({ owner: req.params.id }).populate({ path: 'owner', select: "firstname image lastname email _id role " })

        res.json(posts)
    }
    catch (err) {
        res.status(400).json({ err: err })
    }
}


const deletePost = async (req, res) => {


    try {
        
        await Commnet.deleteMany({postid:req.params.id})
        const post = await Post.findOne({ _id:req.params.id })
    const public_id=post.image.public_id
  //  console.log( "piblic id is",public_id)


       await cloudinary.uploader.destroy(public_id);
        const deletedPost = await Post.findByIdAndDelete(req.params.id)
        res.json(deletedPost)
    }
    catch (err) {
        res.status(400).json({ errors: [{ msg: err.message }] })
    }
}
const updatePost = async (req, res) => {
    try {
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, { ...req.body })
        res.json(updatedPost)
    }
    catch (err) {
        res.status(400).json({ errors: [{ msg: err.message }] })
    }
}

const vote = async (req, res) => {
    try {  
        const post = await Post.findOne({ _id:req.params.id })
     //   console.log(req.body)
       // console.log(post.rating.voters) 
        let tab= post.rating.voters.filter((elm)=>(elm.voter==req.body.rating.voter))
       // console.log("tab  is",tab)
            if(tab.length==0) 
       { post.rating.numberofvoter=Number(post.rating.numberofvoter+1)
        post.rating.some=Number(post.rating.some)+Number(req.body.rating.vote)
       post.rating.vote=parseInt(Number(post.rating.some)/Number(post.rating.numberofvoter))
       post.rating.voters.push({voter:req.body.rating.voter,rating:req.body.rating.vote})
       //console.log("the new post new voter ",post.rating)  
     }
       else{
        if(Number(post.rating.numberofvoter)===1) {
        post.rating.some=Number(post.rating.some)-Number(tab[0].rating)
        post.rating.some=Number(post.rating.some)+Number(req.body.rating.vote)
        post.rating.vote=Number(post.rating.some)
        post.rating.voters=post.rating.voters.filter((elm)=>(elm.voter!=req.body.rating.voter))
        post.rating.voters.push({voter:req.body.rating.voter,rating:req.body.rating.vote})
        //console.log("voter update" ,post.rating)


        }  
        else{
            post.rating.some=Number(post.rating.some)-Number(tab[0].rating)
        post.rating.vote=parseInt(Number(post.rating.some)/Number(post.rating.numberofvoter-1))
        post.rating.some=Number(post.rating.some)+Number(req.body.rating.vote)
        post.rating.vote=parseInt(Number(post.rating.some)/Number(post.rating.numberofvoter))
        post.rating.voters=post.rating.voters.filter((elm)=>(elm.voter!=req.body.rating.voter))
        post.rating.voters.push({voter:req.body.rating.voter,rating:req.body.rating.vote})
       // console.log("the second",post.rating)
       }} 
       //console.log(" the new post",post.rating)
       const updatedPost = await Post.findByIdAndUpdate(req.params.id, {rating:post.rating })
        //console.log(updatedPost)
        res.status(200).json(updatedPost)
    }
    catch (err) {
        res.status(400).json({ errors: [{ msg: err.message }] })
    }
}





const getPostsCount = async (req, res) => {
    try {
        const count = await Post.find().countDocuments()
        res.json({ count })
    }
    catch (err) {
        res.status(400).json({ errors: [{ msg: err.message }] })

    }
}

module.exports = { getotherposts,findposts,getPosts, getMyPosts, getPostsCount, addPost, updatePost, deletePost,vote }
