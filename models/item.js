import mongoose from 'mongoose';

const Item = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  itemImage: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  bid: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: 'created',
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

export default mongoose.model('Item', Item);
