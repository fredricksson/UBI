const mongoose = require('mongoose')
const keys = require('../keys')
 mongoose.connect(keys.mongoDB.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

module.exports = mongoose