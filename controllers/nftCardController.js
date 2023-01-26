import NFT_CardModel from '../models/nftCard.js';

export const create = async (req, res) => {
  try {
    const { name, picture, price } = req.body;

    //Create new nft model
    const nft = new NFT_CardModel({
      name,
      picture,
      price,
      author: req.userId,
    });

    //If no arror above save model to bd
    nft.save();

    //Send result
    res.status(200).json(nft);
  } catch (err) {
    res.status(500).json({ message: 'Unssecsessfull try to create NFT' });
  }
};

export const createBid = async (req, res) => {
  try {
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
  } catch (err) {
    res.status(500).json({ message: 'Unssecsessfull try to create bid' });
  }
};
