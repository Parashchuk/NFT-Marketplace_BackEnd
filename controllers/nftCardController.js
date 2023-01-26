import NFT_CardModel from '../models/nftCard.js';

export const create = async (req, res) => {
  const { name, picture, price } = req.body;

  const nft = new NFT_CardModel({
    name,
    picture,
    price,
    author: req.userId,
  });

  nft.save();

  res.status(200).json(nft);
};

export const createBid = async (req, res) => {
  const { id, bidValue } = req.body;

  //Find the target which need to make new bid
  const bidTarget = await NFT_CardModel.findById(id).populate('author', '-passwordHash -email');
  if (!bidTarget) return res.json({ message: 'Thing you try to find does not exist' });

  //Create new bid in bidHistory
  bidTarget.bidHistory.push({
    author: req.userId,
    price: bidValue,
  });

  //Save new bid
  bidTarget.save();

  res.json(bidTarget);
};
