const fs = require("fs");
var keywords = null;
//const keywords = require("./keyword.list");


function main(message){
  if(keywords==null)
    return "Keyword list is not been loaded";
  for(let i=0;i<keywords.length;i++){
    let {keyword, func} = keywords[i];
    let result = message.match(keyword);
    if(result){
      let response = keywords[i].response;
      if(typeof response=="object"){
        let response = replaceMulti(result.filter(v=>v!=''&&v!=message), keywords[i].response);
        return {response, func};
      }else{
        
        return {
          response:response.replace(/\$1/g, result[1]),
          func
        };
      }
    }
  }
  return {response:"抱歉, 我沒聽清楚", func:-1};
}

function replaceMulti(msg, res){
  let response = res[msg.length-2];
  let rep = response.match(/\$\d+/g);
  for(let i=0;i<msg.length-1;i++){
    response = response.replace(rep[i], msg[i+1]);
  }
  console.log(response, rep);
  return response;
}

function load(_ROOT, _PATH, callback){
  keywords = require(`${_ROOT}/${_PATH}`);
  if(callback)
    callback();
}

exports.loaddata = load;
exports.analysis = main;