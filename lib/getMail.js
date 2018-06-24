const fs = require('fs');
//function to return all mail files in directory
module.exports = function(cb){
  fs.readdir('../data', 'utf-8', function(err,data){
    
    cb(data);
  })
}