const userModel = require('./userModel');
var bcrypt = require('bcryptjs');
var _ = require('lodash');
// Note: Do not extend this class, only BaseModel is allow to be extended from.
// because more than 2 levels inheritance could lead to tight-coupling design and make everything more complicated
class UsertModel {
  create(data) {
    return new userModel(data).save();
  }
  getUserForLogin(agent) {
    return userModel.findOne({
        email: agent.email
      })
      .select('+password')
      .exec()
      .then(function (doc) {
        if (doc && _.isString(doc.password)) {
          // compare password
          return bcrypt.compareSync(agent.password, doc.password) ? doc : null;
        } else {
          // no such document
          return null;
        }
      });
  }
  getProfile() {
    return userModel.find();
  }
  checEmailIdExist(email) {
    return userModel.findOne({email:email});
  }
}

module.exports = UsertModel;
