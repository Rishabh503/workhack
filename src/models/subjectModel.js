import mongoose from "mongoose";


const subjectSchema=new mongoose.Schema({
    name:{
           type:String,
        required:true,
        unique:true
    },
    student:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Student"
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

const Subject=mongoose.model.Subject || mongoose.model("Subject",subjectSchema)
export default Subject