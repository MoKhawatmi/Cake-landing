const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const cakeSchema=new Schema({
    name:{type: String},
    description:{type: String},
    price:{type: String},
    image:{type: String},
    onSale:{type: Boolean, default: false},
    saleDescription:{type: String, default: ""}
},{ collection: 'Cakes' });

const Cake=mongoose.model("Cakes",cakeSchema);
module.exports=Cake;

