const {_PORT, _HOST} = require("./config/server");
const keyword = require("./modules/keyword");

const net = require('net');
const crypto = require("./modules/algorithm.rsa");
const {android, linkit} = require("./config/device.key");
const color = require("./modules/terminal-color");
const funcs = require("./functions");

const security = !process.argv[2];

color.println(security?"decrypte the message":"read cpihertext only", {fore:"red"});
const server = net.createServer(function(socket) {
	//socket.write("歡迎光臨\r\n");
  socket.id = "client-"+Number(new Date()).toString(16);
  socket.on('data', function (data) {
    console.log(data.toString());
    if(security)
      data = data.toString().split(",").map(
        v=>String.fromCharCode(crypto(v, android.key, android.mod))
      ).join("");
    else
      data = data.toString();
    console.log(data);
    let {response, func, match} = keyword.analysis(data);
    if(funcs[func]){
      funcs[func](1, match, ({error, message})=>{
        socket.write(`${error||response}\r\n`, ()=>{
        console.log("request:", data);
        console.log("response:", error||response);
        console.log("function:", func);
        });
      });
    }else{
      socket.write(`${response}\r\n`, ()=>{
        console.log("request:", data);
        console.log("response:", response);
        console.log("function:", func);
      });
    }
    // write event: 傳輸資料的事件
    //socket.write(`${response}\r\n`, function () {
    //  console.log(`request: ${data}\nresponse:${response}, function: ${func}`);
    //  if(func!=-1)
    //    funcs[func](1, match[1], ({error, message})=>{
    //      console.log(error, message);
    //    });
    //})
    socket.on("close", ()=>{
      console.log(socket.id, "disconnect");
    })
    socket.on("error",(error)=>{
      //console.log("error", error);
    });
    socket.on("connection", ()=>{
      console.log("new client");
    })
  })
});

keyword.loaddata(__dirname, "config/keyword.list.js", ()=>{
  color.println("keyword list loading success", {fore:"blue"});
});

server.listen(3000, "0.0.0.0", ()=>{
  color.print("Server listen on ", {fore:"green"});
  color.println(`${_PORT}`, {fore:"green", sys:"bright"});
})