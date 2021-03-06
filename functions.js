const request = require("request");
const crypto =  require("./modules/algorithm.rsa");
const devices = require("./config/device.address");
const { linkit } = require("./config/device.key");
function lightControl(id, state, callback){
  state[1] = state[1].replace(/開/g, "on").replace(/關/g, "off");

  let device = devices.find((v)=>v.id==id&&v.device==="light");
  console.log(device);
  
  console.log(state);
  console.log(linkit);
  
  let object = [], status = [];
  let server = `http://${device.IP}${device.PORT==80?'':(":"+device.PORT)}`;
  for(let k of ("light".split(""))){
    object.push(crypto(k.charCodeAt(), linkit.key, linkit.mod));
  }
  for(let k of state[1]){
    status.push(crypto(k.charCodeAt(), linkit.key, linkit.mod));
  }
  server = `${server}/?turn=${object.join(",")}&action=${status.join(",")}`;
  console.log(server);
  //console.log( 
  //  object.map(v=> String.fromCharCode(crypto(v, 7, linkit.mod)) ).join(""),
  //  status.map(v=> String.fromCharCode(crypto(v, 7, linkit.mod)) ).join("") 
  //);
  request(server, (e,r,d)=>{
    if(e||!d)
      return callback({error:"something got wrong"});
    return callback({message:"success"});
  })
}

exports.light = lightControl;