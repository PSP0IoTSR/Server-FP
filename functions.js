const request = require("request");
const crypto =  require("./modules/algorithm.rsa");
const devices = require("./config/device.address");
const { linkit } = require("./config/device.key");
function lightControl(id, state, callback){
  let device = devices.find((v)=>v.id==id&&v.device==="light");
  console.log(device);
  
  console.log(linkit);
  
  let object = [], status = [];
  let server = `http://${device.IP}${device.PORT==80?'':(":"+device.PORT)}`;
  for(let k of ("light".split(""))){
    object.push(crypto(k.charCodeAt(), linkit.key, linkit.mod));
  }
  for(let k of state){
    status.push(crypto(k.charCodeAt(), linkit.key, linkit.mod));
  }
  server = `${server}/?turn=${object.join(",")}&action=${status.join(",")}`;
  console.log(server);

  request(server, (e,r,d)=>{
    if(e||!d)
      return callback({error:"something got wrong"});
    return callback({message:"success"});
  })
}

exports.light = lightControl;