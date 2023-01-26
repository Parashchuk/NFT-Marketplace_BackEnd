import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import UserModel from '../models/user.js';
import { validationResult } from 'express-validator';

export async function register(req, res) {
  try {
    // Validate request body from user
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ message: errors.array() });

    //Destructuring
    const { username, email, password } = req.body;

    //Validate if username or email is unique
    const isUniqueUsername = await UserModel.findOne({ username });
    const isUniqueEmail = await UserModel.findOne({ email });
    if (isUniqueUsername) {
      return res.status(400).json({ message: 'The username already taken', field: 'username' });
    } else if (isUniqueEmail) {
      return res.status(400).json({ message: 'The email already taken', field: 'email' });
    }

    // Hash password to send into DB
    const passwordCrypt = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

    // Create new user and send into DB
    const user = new UserModel({ username, email, passwordHash: passwordCrypt });
    user.save();

    // Create user's token
    const token = jwt.sign({ _id: user._doc._id }, 'SECRET1q2w3e4r', { expiresIn: '30d' });

    // Return response without passwordHash
    const { passwordHash, ...userData } = user._doc;
    res.status(200).json({ ...userData, token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Unsuccsessful registration' });
  }
}

export const login = async (req, res) => {
  try {
    // Validate request body from user
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ message: errors.array() });

    const { email, password } = req.body;

    // Search user in DB by email
    const user = await UserModel.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Incorrect email or password' });

    // Check password
    const isPassMatch = await bcrypt.compare(password, user._doc.passwordHash);
    if (!isPassMatch) return res.status(400).json({ message: 'Incorrect email or password' });

    // Return token
    const token = jwt.sign({ _id: user._doc._id }, 'SECRET1q2w3e4r', { expiresIn: '30d' });

    // Return response without passwordHash
    const { passwordHash, ...userData } = user._doc;
    res.status(200).json({ ...userData, token });
  } catch (err) {
    res.status(500).json({ message: 'Unsuccsessful try to login' });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId).populate({
      path: 'inventory',
      populate: {
        path: 'collections',
      },
      populate: {
        path: 'nfts',
      },
    });
    if (!user) return res.status(404).json({ messages: 'Not found' });

    const { passwordHash, ...userData } = user._doc;
    res.status(200).json({ ...userData });
  } catch (err) {
    console.log(err);
    res.status(403);
  }
};
