const UserModel = require('./user/user');
const ProductModel = require('./product/product');
module.exports = {
  User: new UserModel(),
  Product:new ProductModel()
};
  