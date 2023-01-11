import UserModel from '../models/user.js';

export const getAll = (req, res) => {
  try {
    if (Object.keys(req.query).length === 0) {
      return res.status(400).json({ message: 'Unsuccessful try to load Users' });
    }

    const { limit, sort } = req.query;

    UserModel.find()
      .sort({ [sort]: 'desc' })
      .limit(limit)
      .exec((err, users) => {
        if (err) res.status(400).json({ message: 'Unsuccessful try to load Users' });

        const [passwordHash, ...data] = users;
        res.status(200).json(data);
      });
  } catch (err) {
    res.status(400).json({ message: 'Unsuccessful try to load Users' });
  }
};
