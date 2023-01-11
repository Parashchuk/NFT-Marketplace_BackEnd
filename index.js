import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import checkAuth from './utils/checkAuth.js';
import { registerValidate, loginValidate } from './validations/auth.js';
import * as authController from './controllers/authController.js';
import * as usersController from './controllers/usersController.js';
import * as collectionsController from './controllers/collectionsController.js';

mongoose.set('strictQuery', false);
mongoose
  .connect(
    'mongodb+srv://admin:1q2w3e4r@nftmarketplace.iafisyb.mongodb.net/NFT_Marketplace?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
    }
  )
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch((err) => console.log(err));

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => {
  res.status(200).send({ message: 'success' });
});

//Auth
app.post('/auth/register', registerValidate, authController.register);
app.post('/auth/login', loginValidate, authController.login);
app.get('/auth/me', checkAuth, authController.getMe);

//Users
app.get('/users', usersController.getAll);

//Collections
app.get('/collections', collectionsController.getAll);
app.post('/collections', checkAuth, collectionsController.create);

app.listen(PORT, () => console.log('Servet started on port ' + PORT));
