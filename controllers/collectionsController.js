import CollectionModel from '../models/collection.js';

export const getAll = (req, res) => {
  try {
    if (Object.keys(req.query).length === 0) {
      return res.status(400).json({ message: 'Unsuccessful try to load Collections' });
    }

    const { limit, sort } = req.query;

    CollectionModel.find()
      .sort({ [sort]: 'desc' })
      .limit(limit)
      .populate('author', '-passwordHash')
      .exec((err, collections) => {
        if (err) res.status(400).json({ message: 'Unsuccessful try to load Collections' });
        res.status(200).json(collections);
      });
  } catch (err) {
    res.status(400).json({ message: 'Unsuccessful try to load Collections' });
  }
};

export const create = (req, res) => {
  try {
    const collection = new CollectionModel({
      name: req.body.name,
      author: req.userId,
      tags: req.body.tags,
    });

    collection.save();

    res.status(200).json({
      collection,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: 'Unsuccessful try to create Collections' });
  }
};
