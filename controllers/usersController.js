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
      .select('-email -passwordHash')
      .exec((err, users) => {
        if (err) return res.status(400).json({ message: 'Unsuccessful try to load Users' });

        res.status(200).json(users);
      });
  } catch (err) {
    res.status(400).json({ message: 'Unsuccessful try to load Users' });
  }
};

export const getOne = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id).populate({
      path: 'inventory',
      populate: {
        path: 'collections',
      },
      populate: {
        path: 'nfts',
      },
    });
    if (!user) return res.status(404).json({ message: 'User you try to find does not exist' });

    const { passwordHash, email, ...data } = user._doc;
    res.status(200).json(data);
  } catch {}
};
