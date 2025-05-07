import mongoose, { Schema } from 'mongoose';

const CounterSchema = new Schema({
  _id: { type: String, required: true }, // Name of the counter (e.g., 'visitorId')
  sequence: { type: Number, default: 0 }, // The current sequence number
});

export default mongoose.models.Counter || mongoose.model('Counter', CounterSchema);