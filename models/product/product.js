const productModel = require('./productModel');
var _ = require('lodash');

// Note: Do not extend this class, only BaseModel is allow to be extended from.
// because more than 2 levels inheritance could lead to tight-coupling design and make everything more complicated
class ProductModel {
  create(data) {
    return new productModel(data).save();
  }
  findOneByName(name,category) {
    return productModel.findOne({productName:name,productCategory:category});
  }
  listProduct(offset,limit){
    return productModel.paginate({}, { offset, limit })
  }
  listProductById(id){
    return productModel.findOne({_id:id});
  }
  deleteProductByID(id){
    return productModel.findOneAndRemove({_id:id});
  }
   deleteProductByID(id){
    return productModel.findOneAndRemove({_id:id});
  }
  updateProductByID(id,value){
    return productModel.updateOne({ _id: id }, { $set: value })
  }
  searchProductByhastag(hasTag){
    return productModel.find( { hashtags: { $all: hasTag } } )
  }
}

module.exports = ProductModel;
