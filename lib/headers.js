//@params array of header lines;
const regExps = require("./regExps"); 
module.exports = function(strArray) {
  let headerObj = {};
  let current = 0;
  strArray.map(function(str,i,array){
    //if header line contains a ":" and doesn't start wit an empty space
    //line is a header property key
    if(str.indexOf(": ") > -1 && str.charAt(0) !== " "){
      //if line has multiple ":" make sure to include rest of values left of initial ":"
      if(str.split(regExps.colon).length > 1){
        headerObj[str.split(regExps.colon)[0]] = str.split(regExps.colon).slice(1).join();
      }else{
        headerObj[str.split(regExps.colon)[0]] = str.split(regExps.colon)[1];
      }
      //tracking index of header property line 
      current = i;
    }
    else{
      //append line to last header property line separating with a pipe "|"
      headerObj[array[current].split(regExps.colon)[0]] += ` | ${str.trim()}`
    }
   
  })
  return headerObj;
};


