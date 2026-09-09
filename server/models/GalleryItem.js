import mongoose from 'mongoose';

const galleryItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, required: true },
  category: { type: String, enum: ['contest', 'workshop', 'culture'], required: true },
  image: { type: String, required: true },
  span: { type: String, default: '' },
  isHomepage: { type: Boolean, default: false },
  order: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model('GalleryItem', galleryItemSchema);
