import mongoose from 'mongoose';
import env from '../config';

mongoose.connect(env.MONGO_URL);

mongoose.Promise = global.Promise;

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

const PDVSchema = mongoose.Schema({
  _id: mongoose.Schema.ObjectId,
  id: Number,
  tradingName: String,
  ownerName: String,
  document: String,
  coverageArea: {
    type: String,
    coordinates: Array,
  },
  address: {
    type: String,
    coordinates: Array,
  },
});

const PDVModel = mongoose.model('pdvs', PDVSchema);

export default PDVModel;
