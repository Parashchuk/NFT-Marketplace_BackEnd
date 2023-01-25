import mongoose from 'mongoose';
import bidPost from './_bidPostSchema.js';

const Item = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  itemImage: {
    type: String,
    require: true,
  },
  price: {
    type: String,
    require: true,
  },
  bidHistory: [bidPost],
  status: {
    type: String,
    default: 'created',
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
  },
});

export default mongoose.model('Item', Item);
