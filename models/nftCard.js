import mongoose from 'mongoose';
import bidPost from './_bidPost.js';

const NFTCard = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  picture: {
    type: String,
    require: true,
  },
  price: {
    type: String,
    require: true,
  },
  bidHistory: [bidPost],
  author: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: 'User',
  },
});

export default mongoose.model('NFTCard', NFTCard);
