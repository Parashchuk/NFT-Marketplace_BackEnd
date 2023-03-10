import UserModel from '../models/user.js';

export const getAll = (req, res) => {
  try {
    //Check if queries was correctly send to server
    if (Object.keys(req.query).length === 0) {
      return res.status(400).json({ message: 'Unsuccessful try to load Users' });
    }

    const { limit, sort } = req.query;

    //Find all users by fort with filter, withour three fields: email, password, inventory
    UserModel.find()
      .sort({ [sort]: 'desc' })
      .limit(limit)
      .select('-email -passwordHash -inventory')
      .exec((err, users) => {
        if (err) return res.status(400).json({ message: 'Unsuccessful try to load Users' });

        res.status(200).json(users);
      });
  } catch (err) {
    res.status(500).json({ message: 'Unsuccessful try to load Users' });
  }
};

export const getOne = async (req, res) => {
  try {
    //Find user by id and throw error if don't
    const user = await UserModel.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User you try to find does not exist' });

    res.status(200).json(user);
  } catch {
    res.status(500).json({ message: 'Unsuccessful try to find user' });
  }
};

export const getInventory = async (req, res) => {
  try {
    //Henlder to two routes
    const fetchInventoryHendler = async (id) => {
      //Find user by id and paste all values instead of object id's in inventory field
      const user = await UserModel.findById(id)
        .populate({
          path: 'inventory',
          populate: {
            path: 'collections',
            populate: {
              path: 'images author',
            },
          },
        })
        .populate({
          path: 'inventory',
          populate: {
            path: 'nfts',
            populate: {
              path: 'author',
            },
          },
        })
        .select('inventory');
      if (!user) return res.status(404).json({ message: 'User you try to find does not exist' });

      //Make sort to inventory either nfts or collections, by default nfts
      if (req.query.sort) {
        if (req.query.sort === 'nfts') {
          res.status(200).json(user.inventory.nfts);
        } else if (req.query.sort === 'collections') {
          res.status(200).json(user.inventory.collections);
        }
      } else {
        res.status(200).json(user.inventory.nfts);
      }
    };

    //If have no params then it's by auth id serach, if queries then use userId from params
    if (Object.keys(req.params).length === 0) {
      fetchInventoryHendler(req.userId);
    } else {
      fetchInventoryHendler(req.params.id);
    }
  } catch (error) {
    res.status(500).json({ message: 'Unsuccessful try to load data' });
  }
};
