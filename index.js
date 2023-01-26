import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import checkAuth from './utils/checkAuth.js';
import { registerValidate, loginValidate } from './validations/auth.js';
import * as authController from './controllers/authController.js';
import * as usersController from './controllers/usersController.js';
import * as collectionsController from './controllers/collectionsController.js';
import * as nftCardController from './controllers/nftCardController.js';

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

app.use(cors({ origin: ['http://localhost:3000', 'https://parashchuk.github.io'] }));
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => {
  res.status(200).send({ message: 'success' });
});

//Auth
app.post('/auth/register', registerValidate, authController.register);
app.post('/auth/login', loginValidate, authController.login);
app.post('/auth/me', checkAuth, authController.getMe);

//Users
app.get('/users', usersController.getAll);
app.get('/users/inventory', checkAuth, usersController.getInventory);
app.get('/users/:id', usersController.getOne);
app.get('/users/:id/inventory', usersController.getInventory);

//Collections
app.get('/collections', collectionsController.getAll);
app.post('/collections', checkAuth, collectionsController.create);
app.patch('/collections/bid', checkAuth, collectionsController.createBid);

//NFT_Card
app.post('/nfts', checkAuth, nftCardController.create);
app.patch('/nfts/bid', checkAuth, nftCardController.createBid);

app.listen(PORT, () => console.log('Server started on port ' + PORT));
