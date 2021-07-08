const Promise = require('bluebird');
var mongoose = require('mongoose');
var Schema = require('mongoose').Schema;
// const getTime = require('date-fns/get_time');


class BaseModel {
  constructor(collection = null, schema = {}) {
    this.schema = schema;
    this.collection = collection;
    this.subscriberList = [];
    this.parentCollectionId = null;

    if (!collection) throw new Error(`No 'collection' parameter provided in constructor.`);
  }

  generateData(id) {
    return {
      id: id,
      ...this.schema,
      deletedAt: null,
    };
  }
}

module.exports = BaseModel;
