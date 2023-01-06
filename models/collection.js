import mongoose from 'mongoose';

const Collection = new mongoose.Schema({
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
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

export default mongoose.model('Collection', Collection);
