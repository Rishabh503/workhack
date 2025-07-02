import mongoose from 'mongoose';
const topicSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String, // You can also use enum if you want to restrict values
      enum: ['Easy', 'Medium', 'Hard'],
      required: true,
    },
    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Subject',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Topic || mongoose.model('Topic', topicSchema);
