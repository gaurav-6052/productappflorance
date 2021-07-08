const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;
const bcrypt = require('bcryptjs');

// bcrypt password
const hashPass = function (value) {
    return bcrypt.hashSync(value);
};


// transform
const omitPrivate = function (doc, user) {
    delete user.id;
    delete user.__v;
    delete user.modifiedDate;
    return user;
};

// options
const options = {
    toJSON: { virtuals: true, transform: omitPrivate },
    toObject: { virtuals: true, transform: omitPrivate }
};


// schema
const schema = new Schema({
    // Personal profile information
    name:  { type: String},
    email:  { type: String, trim: true, lowercase: true },
    role: { type: String, trim: true, lowercase: true,default:"User" },
    password:  { type: String, select: false, set: hashPass},
    phone:  { type: Number},
    createBy :  { type: String, trim: true, lowercase: true },
    createDate : { type: Date, default: Date.now},
    modifiedBy :  { type: String, trim: true, lowercase: true },
    modifiedDate : { type: Date,default: Date.now},
    deletedBy : { type: String, trim: true, lowercase: true },
    deletedDate :  { type: Date},

}, options);

// model
module.exports = mongoose.model('User', schema);