//extraction function that returns an array of mail objects
//each mail obj = {headerObj},{body:<array of mail parts>}

const getMail = require('./getMail');
const fs = require('fs');
const headers = require('./headers');
const regExps = require('./regExps');
const body = require('./body');
//function to return MIME boundary values
//return type is an array or null if no boundary is found
function getBoundary(str){
  let separator = str.match(regExps.boundary);
  separator = separator.map(function(element){
    return ("--"+element.split("=")[1].replace(regExps.qoutes,""));
  })
  if(separator.length){
    return separator
  }
  else{
    return null;
  }
}
module.exports = function(cb){
      //call to function to read directory and return files(mail) to read
      getMail(function(data){
       
        let result = [];
       
       result = data.map(function(url){

            //return contents of mail as a single string
            let str = fs.readFileSync(`../data/${url}`, "utf-8");
            let mailObj = {}
               //get headers from mail string by splitting string at initial blank line and returning only first result
               //further breaking it into an array of single line strings
             mailObj.header =  headers(str.split(regExps.blank,1)[0].split(regExps.line));
             //get boundaries from mail string
             mailObj.boundaries = getBoundary(str);
             //check if body contains multiple content-types by checking the boundaries
             //if true body is an array of different body components
             //otherwise body is a string containing all contents after mail header
             if(mailObj.boundaries){
                let bodyPart = 0;
                
                mailObj.body = mailObj.boundaries.map( function(boundary,i){
                          //split mail string on blank line and return everything after rejoining by a blank line to extract MIME part headers
                          //and split on current boundary
                          let bodyObj = {Part:{}}; //obj to hold current mail part data
                          let index = 0; //part number ex: 0:text 1:img 2:html
                          
                          while(index <= (mailObj.boundaries.length===1 ? i+1:i)){
                            bodyObj.Part[bodyPart] = (body(str.split(regExps.blank).slice(1).join("\r\n\r\n").split(boundary).slice(1)[index]));
                            index++;
                            bodyPart++;
                          }
                          return bodyObj;
                })
             }else{
               //otherwise split/get email body
               mailObj.body = str.split(regExps.blank).slice(1).join();
             }
             return mailObj;

        })
        //callback with result
        cb(result);
    
      })
}