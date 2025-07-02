import mongoose from "mongoose";

const goalSchema = new mongoose.Schema(
  {
    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject", 
      required: true,
    },
    deadline: {
      type: Date,
      required: true,
    },
    completionStatus: {
      type: Boolean,
      default: false,
    },
    title:{
        type:String,
        required:true
    },
    sessions:[{
       type: mongoose.Schema.Types.ObjectId,
      ref: "Session", 
      required: true,
    }]
  },
  {
    timestamps: true, 
  }
);

// Use existing model if already compiled, otherwise create new one
const Goal = mongoose.models.Goal || mongoose.model("Goal", goalSchema);
export default Goal;
