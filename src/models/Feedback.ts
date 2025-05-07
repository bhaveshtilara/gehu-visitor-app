import mongoose, { Schema } from 'mongoose';

const FeedbackSchema = new Schema({
  visitorId: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comments: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Feedback || mongoose.model('Feedback', FeedbackSchema);