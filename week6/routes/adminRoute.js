const express = require("express")
const router = express()

const session = require("express-session")
const config = require("../config/config")
router.use(session({
    secret: config.sessionSecret,
    saveUninitialized: true,
    cookie: { maxAge: 60000 },
    resave: false
}))




const bodyParser = require("body-parser")
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))

router.set('view engine', 'ejs')
router.set('views', './views/admin')
const auth = require("../middleware/adminAuth")

const adminController = require("../controllers/adminController")
// const { verifyLogin } = require("../controllers/userController")

router.get('/', auth.isLogout, adminController.loadLogin)

router.post('/', adminController.verifyLogin)
router.get('/home', auth.isLogin, adminController.loadDashboard)



router.get('/addUser', auth.isLogin, adminController.addUserLoad)
router.post('/addUser', adminController.addUser)
router.get('/updateUser', auth.isLogin, adminController.updateUser)
router.post('/updateUser', adminController.updated)
router.get('/deleteUser', adminController.deleteUser)
router.get('/logout', auth.isLogin, adminController.logoutAdmin)
router.get('*', function (req, res) {
    res.redirect('/admin')
})
module.exports = router