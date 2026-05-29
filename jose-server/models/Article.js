const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String },
    title: { type: String, required: true },
    imageSrc: { type: String, default: '' },
    image: { type: String },
    content: {
      type: [String],
      required: true,
      validate: {
        validator: (paragraphs) => Array.isArray(paragraphs) && paragraphs.length > 0,
        message: 'At least one paragraph is required',
      },
    },
    paragraphs: { type: [String] },
    isPublished: { type: Boolean, default: true },
    status: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Article || mongoose.model('Article', articleSchema);
