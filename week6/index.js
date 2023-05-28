const mongoose =require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/user_management_system')


const express =require('express')
const app=express()

 

////for user routes

const userRoute = require('./routes/userRoute')
app.use('/',userRoute)

//for aadmin router
const adminRoute = require("./routes/adminRoute")
app.use('/admin',adminRoute)



app.listen(3000,function(){
    console.log('server is running...')
});