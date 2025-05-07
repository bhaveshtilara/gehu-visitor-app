const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

const VisitorSchema = new mongoose.Schema(
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
    visits: [
      {
        date: { type: Date, default: Date.now },
        exitDate: { type: Date },
      },
    ],
    isBlocked: { type: Boolean, default: false },
    createdAt: { type: Date, required: true, default: Date.now },
    updatedAt: { type: Date, required: true, default: Date.now },
  },
  { timestamps: true }
);

const Visitor = mongoose.model('Visitor', VisitorSchema);

async function migrate() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected successfully');

    // Find all visitors
    const visitors = await Visitor.find();

    // Update each visitor to ensure createdAt and updatedAt exist
    for (const visitor of visitors) {
      if (!visitor.createdAt) {
        visitor.createdAt = new Date();
      }
      if (!visitor.updatedAt) {
        visitor.updatedAt = visitor.createdAt || new Date();
      }
      await visitor.save();
      console.log(`Updated visitor: ${visitor.visitorId}`);
    }

    console.log('Migration completed successfully');
  } catch (error) {
    console.error('Migration error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('MongoDB disconnected');
  }
}

migrate();