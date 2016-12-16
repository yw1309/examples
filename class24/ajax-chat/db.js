var mongoose = require('mongoose');

var Message = mongoose.Schema({
  text: {type: String},
  dateSent: {type: Date},
})

mongoose.model('Message', Message);
mongoose.connect('mongodb://localhost/jaxin');
