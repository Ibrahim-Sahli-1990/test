const router = require('express').Router()
const conversationController = require('../controllers/conversationController')


router.post("/getconversation",conversationController.getconversation) 
router.put ("/sendingmessage",conversationController.sendingmessage) 
module.exports = router   