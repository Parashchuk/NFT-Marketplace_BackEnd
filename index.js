import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

mongoose.set('strictQuery', true);
mongoose
  .connect(
    'mongodb+srv://admin:1q2w3e4r@petcluster.iafisyb.mongodb.net/?retryWrites=true&w=majority'
  )
  .then(() => console.log('MongoDB was connected successfully'))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 4444;
const app = express();
const corsOptions = {
  origin: '',
  optionsSuccessStatus: 200,
};

app.use(express.json);
app.use(cors());

app.get('/', (req, res) => {
  res.send({ message: 'success' });
});

app.listen(PORT, () => {
  console.log('Server was started on port ' + PORT);
});
