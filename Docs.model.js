var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var DocsSchema = new Schema({
  title: String,
  description: String,
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
});


module.exports = mongoose.model('Docs', DocsSchema); 
