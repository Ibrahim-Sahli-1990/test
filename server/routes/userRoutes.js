const router = require('express').Router()
const userController = require('../controllers/userController')
const { validationCheck } = require('../middlewares/dataCheckMiddleware')
const { tokenMiddleware } = require('../middlewares/tokenMiddleware')


router.post('/register', validationCheck, userController.register)
router.post('/login',validationCheck,userController.login)
//router.get('/log', validationCheck,userController.login)

router.get('/getprofile', tokenMiddleware, userController.getUserProfile)
router.get('/allusers',tokenMiddleware,userController.alluser)
router.put('/addfreiend',userController.addfreiend)
router.put('/connect',tokenMiddleware,userController.connect)
router.put('/disconnect/:id',userController.disconnect)

router.put("/disconnectall",userController.disconnectall)
router.get('/getotheruser/:id', userController.getotheruser)
//updatingprofileimage
router.put('/updatingprofileimage', tokenMiddleware, userController.updatingprofileimage)

 
module.exports = router   