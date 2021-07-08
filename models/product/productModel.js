const BaseModel = require('../base');

const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const Schema = require('mongoose').Schema;
const { conformsTo } = require('lodash');

// transform
const omitPrivate = function (doc, product) {
    delete product.id;
    delete product.__v;
    delete product.modifiedDate;
    return product;
};

// options
const options = {
    toJSON: { virtuals: true, transform: omitPrivate },
    toObject: { virtuals: true, transform: omitPrivate }
};


// schema
const schema = new Schema({
  productName:  { type: String},
  productImage: { type: String },
  productCategory:  { type: String},
  productPrice:  { type: Number},
  productDescription:{type: String},
  hashtags: {type:Array,default:[]},
  createdBy :  { type: String, trim: true, lowercase: true },
  createDate : { type: Date, default: Date.now},
  modifiedBy :  { type: String, trim: true, lowercase: true },
  modifiedDate : { type: Date,default: Date.now},
  deletedBy : { type: String, trim: true, lowercase: true },
  deletedDate :  { type: Date}

}, options);
schema.plugin(mongoosePaginate);

module.exports = mongoose.model('Product', schema);
