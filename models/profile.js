var mongoose = require('mongoose');

let profileSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  joinDate: Date,
  name: {
    firstName: String,
    lastName: String
  },
  trips: {
    signups: [String],
    went: [String],
    bailed: [String]
  },
  membership: {
    member: Boolean,
    endDate: Date
  },
  queens: {
    email: String,
    netID: String,
    studentNum: String
  },
  driver: {
    age: String,
    license: String,
    car: String
  },
  notes: {
    dietary: String,
    other: String
  }
});

let Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
