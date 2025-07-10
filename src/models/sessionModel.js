// models/Session.js
import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema(
  {
    student:{
       type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required:true
    },
    goal: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Goal',
    },
    date: {
      type: Date,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Session=mongoose.models.Session || mongoose.model('Session', sessionSchema);
export default Session
