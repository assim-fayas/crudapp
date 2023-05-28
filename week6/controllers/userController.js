const User = require('../models/userModel')


const bcrypt = require('bcrypt')
const userModel = require('../models/userModel')

//product list


let product = [
    {
        link: "https://5.imimg.com/data5/SELLER/Default/2022/5/LI/SD/QZ/81247077/a1-500x500.JPG",
        title: "IPHONE X",
        price: "30000₹",
        discription: "apple premium product",
    },
    {
        link: "https://m.media-amazon.com/images/I/41+2tWGDs3L.jpg",
        title: "IPHONE Xs",
        price: "36000₹",
        discription: "apple premium product",
    },
    {
        link: "https://cdn.alloallo.media/catalog/product/apple/iphone/iphone-xs-max/iphone-xs-max-gold.jpg",
        title: "IPHONE Xs Max",
        price: "40000₹",
        discription: "apple premium product",
    },
    {
        link: "https://cdn1.smartprix.com/rx-i23Hwk3oU-w420-h420/apple-iphone-11.jpg",
        title: "IPHONE 11",
        price: "40000₹",
        discription: "apple premium product",
    },
    {
        link: "https://cdn.shopify.com/s/files/1/0083/6380/2720/products/35_1_5a619c1f-1d2b-485a-8c83-fe49551bf3e8.jpg?v=1656510690",
        title: "IPHONE 11Pro",
        price: "45000₹",
        discription: "apple premium product",
    },
    {
        link: "https://rukminim1.flixcart.com/image/832/832/xif0q/shoe/m/m/v/-original-imagg7szgcmfgauh.jpeg?q=70",
        title: "NIKE shoe",
        price: "50000₹",
        discription: "Men's wear",
    },
    {
        link: "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/a492d797-cd0a-487d-98c8-d3416c587f35/air-max-dawn-shoe-gq9GGH.png",
        title: "NIKE shoe",
        price: "50000₹",
        discription: "Men's wear",
    },
    {
        link: "https://rukminim1.flixcart.com/image/832/832/xif0q/shoe/a/n/n/-original-imagfyy36gfz7pxc-bb.jpeg?q=70",
        title: "NIKE shoe",
        price: "50000₹",
        discription: "Men's wear",
    },
    {
        link: "https://rukminim1.flixcart.com/image/832/832/k8ro3gw0/watch/n/h/w/68011pp08-fastrack-original-imafqpgyxj24wf6b.jpeg?q=70",
        title: "Fast track",
        price: "50000₹",
        discription: "Men's watch",
    },
    {
        link: "https://rukminim1.flixcart.com/image/832/832/ju79hu80/watch/j/n/h/38025pp01-fastrack-original-imaffdknp6wyfv3h.jpeg?q=70",
        title: "Fast track",
        price: "50000₹",
        discription: "Men's watcht",
    },
    {
        link: "https://rukminim1.flixcart.com/image/832/832/k4rcmfk0pkrrdj/watch-refurbished/h/c/d/c-38048pp01-fastrack-original-imaf9fb9gqp82cfy.jpeg?q=70",
        title: "Fast track",
        price: "50000₹",
        discription: "Men's watch",
    },
    {
        link: "https://rukminim1.flixcart.com/image/416/416/k2jbyq80pkrrdj/mobile-refurbished/e/b/u/iphone-11-pro-max-64-a-mwhg2hn-a-apple-0-original-imafkg2fg3evmhuy.jpeg?q=70",
        title: "IPHONE 11pro Max",
        price: "50000₹",
        discription: "apple premium product",
    }
]

const securePassword = async (password) => {
    try {
        const passwordHash = await bcrypt.hash(password, 10)
        return passwordHash
    } catch (error) {
        console.log(error.message)

    }
}

const loadRegister = async (req, res) => {
    try {
        res.render('registration')
    } catch (error) {
        console.log(error.message);
    }
}
const insertUser = async (req, res) => {
    try {

        const spassword = await securePassword(req.body.password);
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            mobile: req.body.mno,
            password: spassword,
            is_admin: 0,
        });

        const userData = await user.save()

        if (userData) {
            res.render('registration', { message: "Your Registration has been Successfully" });
            // res.send('susessfull')
        } else {
            res.render('registration', { message: "Your Registration has been Failed" });
            // res.send('failure')
        }

    } catch (error) {
        console.log(error.message);

    }
}

//login user method
const loginLoad = async (req, res) => {
    try {
        res.render('login')

    } catch (error) {
        console.log(error.message);
    }
}

/// Verify user 

const verifyLogin = async (req, res) => {
    try {
        const email = req.body.email
        const password = req.body.password

        const userData = await User.findOne({ email: email })

        if (userData) {

            const passwordMatch = await bcrypt.compare(password, userData.password)

            if (passwordMatch) {
                console.log(passwordMatch);

                if (userData.is_admin === 0) {

                    req.session.user_id = userData._id;

                    res.redirect('/home')
                } else {
                    res.render('login', { message: "Invalid Email or Password" })
                }
            } else {
                res.render('login', { message: "Email and Password is Inccorect" })
            }



        } else if (password === "" && email === "") {
            res.render('login', { message: "Please Enter Email and Password " })
        } else {
            res.render('login', { message: "Invalid Email or Password" })
        }


    } catch (error) {
        console.log(error.message);
    }
}


const loadHome = async (req, res) => {
    try {

        res.render('home', { product })
    } catch (error) {
        console.log(error.message);
    }
}

const userLogout = async (req, res) => {
    try {
        req.session.user_id = null;
        res.redirect('/');

    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {
    loadRegister,
    insertUser,
    loginLoad,
    verifyLogin,
    loadHome,
    userLogout
}