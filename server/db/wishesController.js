const WishHasher = require('./WishesModel.js');
const bcrypt = require('bcrypt');

const SALT_WORK_FACTOR = 10;

db = {
    hashWish(wish){
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
      bcrypt.hash(wish, salt, function(err, hash) {
        if(err) {
          console.log('Error with hashing string', err)
        } else {
          console.log('Password is hashing correctly');
        }
        });
    });
    let newWish = new WishHasher({
      wish
    });
    newWish.save((err, data) => {
      if(err) {
        console.log('Error saving wish to database', err)
      }
      else {
        console.log('Wish saved to be hashed')
      }
    })
  },
  deleteAllWishes(){
        WishHasher.deleteMany({}, (err, data) => {
          if(err) {
            console.log('Error deleting wishes from databse', err)
          } else {
            console.log('Wishes drained');
          }
        })
  },
  getAllWishes(req, res, next) {
    WishHasher.find((err, data) => {
      if(err) {
        console.log('error', err)
      } else {
        res.locals.wishes = data;
      }
      next();
    })
  }
}

module.exports = db;

