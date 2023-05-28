const User = require("../models/userModel")

const bcrypt = require('bcrypt')

const securePassword = async (password) => {
    try {
        const passwordHash = await bcrypt.hash(password, 10)
        return passwordHash
    } catch (error) {
        console.log(error.message)

    }
}

const loadLogin = async (req, res) => {
    try {
        res.render('login')
    } catch (error) {
        console.log(error.message);
    }
}

const verifyLogin = async (req, res) => {
    try {
        const email = req.body.email
        const password = req.body.password;

        const userData = await User.findOne({ email: email })

        if (userData) {

            const passwordMatch = await bcrypt.compare(password, userData.password)
            if (passwordMatch) {

                if (userData.is_admin === 0) {
                    res.render('login', { message: "Invalid Admin" })
                } else {
                    req.session.admin_id = userData._id
                    res.redirect('/admin/home')
                    console.log("logined");
                }

            } else {
                res.render('login', { message: "Email and Password is Inccorect" })
            }

        } else {
            res.render('login', { message: "Please Enter Email and Password " })
        }

    } catch (error) {
        console.log(error.message);
    }
}

const loadDashboard = async (req, res) => {
    try {

        const userData = await User.find({ is_admin: 0 })
        res.render('home', { users: userData })
    } catch (error) {
        console.log(error.message);
    }
}
///Add new work start
const addUserLoad = async (req, res) => {
    try {
        res.render('add-user')
    } catch (error) {
        console.log(error.message);
    }
}

const addUser = async (req, res) => {
    try {
        const spassword = await securePassword(req.body.password)

        const user = new User({
            name: req.body.name,
            email: req.body.email,
            mobile: req.body.mno,
            password: spassword,
            is_admin: 0
        })

        const userData = await user.save()

        if (userData) {
            res.redirect('/admin/home')
        } else {
            res.render('add-user')
        }


    } catch (error) {
        console.log(error.message);
    }
}


const updateUser = async (req, res) => {
    try {
        const id = req.query.id
        const userData = await User.findById({ _id: id })

        if (userData) {
            res.render('updateUser', { user: userData })
        } else {
            res.render('/admin/home')
        }

    } catch (error) {
        console.log(error.message);
    }
}

const updated = async (req, res) => {
    try {
        const userUpdateData = await User.findByIdAndUpdate({ _id: req.body.id }, { $set: { name: req.body.name, email: req.body.email, mobile: req.body.mno } })


        res.redirect('/admin/home')

    } catch (error) {
        console.log(error.message);
    }
}

const deleteUser = async (req, res) => {
    try {
        const id = req.query.id
        await User.deleteOne({ _id: id })
        res.redirect('/admin/home')

    } catch (error) {
        console.log(error.message);
    }
}
const logoutAdmin = async (req, res) => {
    try {
        req.session.admin_id = null;
        res.redirect('/admin')
    }
    catch (error) {
        console.log(error.message);
    }
}

module.exports = {
    loadLogin,
    verifyLogin,
    loadDashboard,
    addUserLoad,
    addUser,
    updateUser,
    updated,
    deleteUser,
    logoutAdmin
}