import mongoose from "mongoose";

const Service = mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    description : {
        type : String,
    },
    type : {
        type : Object,
    },
    is_active: {
        type:Number,
        required: true
    },
}, { timestamps:true });

export default mongoose.model('Service', Service);