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
    default:
      'https://marketplace-server-4tlp.onrender.com/upolads/ee11cbb19052e40b07aac0ca060c23ee.jpg',
  },
  headerImage: {
    type: String,
    default:
      'https://marketplace-server-4tlp.onrender.com/upolads/f151ff5e6f961d6d829aef2e9044434a.jpg',
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
  inventory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Collection' }],
  bio: {
    type: String,
    default: 'The user did not write here anything yet',
  },
});

export default mongoose.model('User', User);
