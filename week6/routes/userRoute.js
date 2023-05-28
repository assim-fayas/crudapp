const express = require('express')

const router=express()

const session = require("express-session")
const config = require('../config/config')

const nocache = require('nocache')

router.use(session({
    secret:config.sessionSecret,
    saveUninitialized:true,
    cookie:{maxAge:60000},
    resave:false}))
router.use(nocache())

const auth = require('../middleware/auth')

router.set('view engine','ejs')
router.set('views' ,'./views/users')

const bodyParser = require('body-parser')
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({extended:true}))





const userController = require('../controllers/userController')

router.get('/register',auth.isLogout,userController.loadRegister)

router.post('/register',userController.insertUser)

router.get('/',auth.isLogout,userController.loginLoad)
router.get('/login',auth.isLogout, userController.loginLoad)

router.post('/login',userController.verifyLogin)

router.get('/home',auth.isLogin,userController.loadHome)

router.get('/logout',auth.isLogin,userController.userLogout)



module.exports = router