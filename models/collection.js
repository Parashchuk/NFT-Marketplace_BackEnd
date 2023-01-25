import mongoose from 'mongoose';

const Collection = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    images: {
      type: Array,
      default: [],
    },
    ratings: {
      type: Number,
      default: 0,
    },
    tags: {
      type: Array,
      require: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Collection', Collection);
