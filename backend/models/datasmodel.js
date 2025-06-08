const mongoose = require('mongoose');

const datasSchema = new mongoose.Schema({
  url : {
    type:String,
    required:true
  }
  ,username : {
    type:String,
    required:true
  }
  ,password : {
    type:String,
    required:true
  },id : {
    type:String
  }
});
const Datas = mongoose.model('datas', datasSchema);
module.exports = Datas;