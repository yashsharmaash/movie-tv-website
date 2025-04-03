import mongoose from 'mongoose'

const userschema = mongoose.Schema({
    username:{
        type:String,
        required: true,
        unique: true,

    },
    email:{
        type:String,
        required:true,
        unique:true,

    },
    password:{
        type:String,
        required: true,
    },
    image:{
        type:String,
        deafult:""
    },
    searchHistory:{
        type:Array,
        default:[]
    }

})

export const User = mongoose.model('User', userschema);