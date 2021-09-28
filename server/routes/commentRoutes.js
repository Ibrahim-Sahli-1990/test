const router = require('express').Router()
const commentRoutes=require("../controllers/commentController")
router.post("/addcomment",commentRoutes.addcomment)
router.post("/getcomment",commentRoutes.getcomment)
module.exports = router