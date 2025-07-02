import mongoose from "mongoose";

const studentSchema=new mongoose.Schema({
    clerkId:{
        type:String,
        required:true,
        unique:true
    },
    name:{
           type:String,
        required:true
    },
    email:{
           type:String,
        required:true
    },
    subjects:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Subject"
    }]
   
})

const Student=mongoose.models.Student || mongoose.model("Student",studentSchema)
export default Student