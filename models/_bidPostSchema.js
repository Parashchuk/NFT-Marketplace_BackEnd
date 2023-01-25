import mongoose from 'mongoose';

const bidPost = {
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
};

export default bidPost;
