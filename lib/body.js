const headers = require('./headers');
const regExp = require('./regExps');
module.exports = function(str) {
  
  let bodyObj = {
    bodyHeader: headers(str.split(regExp.blank,1)[0].split(regExp.line).slice(1)),
    text: str.split(regExp.blank).slice(1).join(),
  };
  return bodyObj;
};