const mongoose=require('mongoose');

const userSchema = new mongoose.Schema({


    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    mobile:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    is_admin:{
        type:Number,
        reequire:true
    },
    is_verified:{
        type:Number,
        defult:0
    }
})

module.exports = mongoose.model('User',userSchema)