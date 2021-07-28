const mongoose = require('mongoose');
const myURI = 'mongodb+srv://julia_col:5*n2Jj2wde.VhMG@cluster0.pbslr.mongodb.net/Cluster0?retryWrites=true&w=majority';


mongoose.connect(myURI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', () => {
  console.log('Connected to Database: WishHasher');
});

const URI = process.env.MONGO_URI || myURI;


const WishSchema = mongoose.Schema({
  wish: {
    type: String
  }
})

const WishHasher = mongoose.model('wish', WishSchema)

module.exports = WishHasher;

