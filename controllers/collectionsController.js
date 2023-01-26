import CollectionModel from '../models/collection.js';

export const getAll = (req, res) => {
  try {
    //Check if any querry was attached
    if (Object.keys(req.query).length === 0) {
      return res.status(400).json({ message: 'Unsuccessful try to load Collections' });
    }

    const { limit, sort } = req.query;

    //Find collection with sort value limit, convert author and images from id to data, except password hash and email from response
    CollectionModel.find()
      .sort({ [sort]: 'desc' })
      .limit(limit)
      .populate('author images', '-passwordHash -email')
      .exec((err, collections) => {
        if (err) return res.status(400).json({ message: 'Unsuccessful try to load Collections' });
        res.status(200).json(collections);
      });
  } catch (err) {
    res.status(400).json({ message: 'Unsuccessful try to load Collections' });
  }
};

export const create = (req, res) => {
  try {
    //Set data to new collection model
    const collection = new CollectionModel({
      name: req.body.name,
      author: req.userId,
      tags: req.body.tags,
    });

    //Save collection if no error above
    collection.save();

    //Send collection
    res.status(200).json({
      collection,
    });
  } catch (err) {
    res.status(500).json({ message: 'Unsuccessful try to create Collections' });
  }
};

export const createBid = async (req, res) => {
  try {
    const { id, bidValue } = req.body;

    //Find the target which need to make new bid
    const bidTarget = await CollectionModel.findById(id).populate('author', '-passwordHash -email');
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
