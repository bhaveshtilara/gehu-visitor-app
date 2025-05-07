import mongoose, { Schema } from 'mongoose';

const VisitSchema = new Schema({
  date: { type: Date, default: Date.now },
  exitDate: { type: Date },
});

const VisitorSchema = new Schema(
  {
    visitorId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    purpose: { type: String, required: true },
    category: {
      type: String,
      enum: ['Student', 'Parent', 'Vendor', 'Guest'],
      required: true,
    },
    photoUrl: { type: String },
    visits: [VisitSchema],
    isBlocked: { type: Boolean, default: false },
    createdAt: { type: Date, required: true, default: Date.now }, // Explicitly define createdAt
    updatedAt: { type: Date, required: true, default: Date.now }, // Explicitly define updatedAt
  },
  { timestamps: true } // Automatically manage createdAt and updatedAt
);

export default mongoose.models.Visitor || mongoose.model('Visitor', VisitorSchema);