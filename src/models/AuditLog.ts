import mongoose, { Schema } from 'mongoose';

const AuditLogSchema = new Schema({
  action: { type: String, required: true },
  performedBy: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.models.AuditLog || mongoose.model('AuditLog', AuditLogSchema);