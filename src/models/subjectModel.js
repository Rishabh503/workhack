import mongoose from "mongoose";

const subjectSchema=new mongoose.Schema({
    name:{
           type:String,
        required:true,
        unique:true
    },
    student:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Student",
      required:true
    }],
    topics:[{
        type:mongoose.Schema.Types.ObjectId,
      ref:"Topic"
    }],
    goals:[{
        type:mongoose.Schema.Types.ObjectId,
      ref:"Goal"
    }],
   
})

const Subject=mongoose.models.Subject || mongoose.model("Subject",subjectSchema)
export default Subject