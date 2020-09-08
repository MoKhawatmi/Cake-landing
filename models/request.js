const { Mongoose } = require("mongoose");

const mongoose=require("mongoose");
const { request } = require("express");
const Schema=mongoose.Schema;

const requestSchema=new Schema({
    userName:{
        type:String
    },
    userPhone:{
        type:String
    },
    userLocation:{
        type:String
    },
    image:{
        type:String
    },
    orderDescription:{
        type:String
    }
    ,completed:{
        type:Boolean,
        default: false
    }
},{ collection: "Requests" });

const requset=mongoose.model("Requests",requestSchema);
module.exports=requset;