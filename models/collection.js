import mongoose from 'mongoose';
import bidPost from './_bidPost.js';

const Collection = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    images: [{ type: mongoose.Schema.Types.ObjectId, ref: 'NFTCard' }],
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
    bidHistory: [bidPost],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Collection', Collection);
