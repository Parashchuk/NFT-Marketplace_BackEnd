import mongoose from 'mongoose';

const User = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  passwordHash: {
    type: String,
    require: true,
  },
  avatar: {
    type: String,
    default: null,
  },
  hedaerImage: {
    type: String,
    default: null,
  },
  totalSales: {
    type: Number,
    default: 0,
  },
  volume: {
    type: Number,
    default: 0,
  },
  soldNfts: {
    type: Number,
    default: 0,
  },
  followersCount: {
    type: Number,
    default: 0,
  },
  bio: {
    type: String,
    default: '',
  },
});

export default mongoose.model('User', User);
