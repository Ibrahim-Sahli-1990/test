const router = require('express').Router()
const postController = require('../controllers/postController')
const { tokenMiddleware, checkPostOwner } = require('../middlewares/tokenMiddleware')




router.get('/posts', postController.getPosts)
router.get('/getotherposts/:id', postController.getotherposts)
router.get('/myposts', tokenMiddleware, postController.getMyPosts)

router.get('/findposts',postController.findposts)
router.get('/postcount', postController.getPostsCount)
router.delete('/deletepost/:id', tokenMiddleware, checkPostOwner, postController.deletePost)
router.post('/addpost', tokenMiddleware, postController.addPost)
router.put('/updatepost/:id', tokenMiddleware, checkPostOwner, postController.updatePost)
router.put('/vote/:id', tokenMiddleware, postController.vote)


module.exports = router