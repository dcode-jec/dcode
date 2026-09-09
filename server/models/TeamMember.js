import mongoose from 'mongoose';

const teamMemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  category: { type: String, enum: ['faculty', 'founder', 'leads', 'management', 'pr', 'technical', 'design'], required: true },
  session: { type: String, required: true },
  image: { type: String },
  description: { type: String },
  socials: {
    instagram: String,
    linkedin: String,
    email: String
  },
  order: { type: Number, default: 0 },
  isCoreTeam: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model('TeamMember', teamMemberSchema);
