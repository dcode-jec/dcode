import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, enum: ['FLAGSHIP', 'COMPETITION', 'HACKATHON', 'WORKSHOP', 'ORIENTATION', 'SOCIAL'], required: true },
  category: { type: String, enum: ['Contests', 'Workshops', 'Culture'], required: true },
  date: { type: String, required: true },
  location: { type: String },
  description: { type: String, required: true },
  image: { type: String },
  isMain: { type: Boolean, default: false },
  isHomepage: { type: Boolean, default: false },
  order: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model('Event', eventSchema);
