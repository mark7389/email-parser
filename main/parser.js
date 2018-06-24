const extract = require('../lib/extract');
console.time("Time to Complete");
extract(function(result){
  console.log(JSON.stringify(result,null,2));
  console.timeEnd("Time to Complete");
})
