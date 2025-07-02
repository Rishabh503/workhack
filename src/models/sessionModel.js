// models/Session.js
import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema(
  {
    goal: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Goal',
      required: true,
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
    status: {
      type: String, // "Pending", "Done", etc.
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Session || mongoose.model('Session', sessionSchema);
