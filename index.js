const {_PORT, _HOST} = require("./config/server");
const keyword = require("./modules/keyword");
const net = require('net');
const color = require("./modules/terminal-color");

const server = net.createServer(function(socket) {
	//socket.write("歡迎光臨\r\n");
  socket.on('data', function (data) {
    let {response, func} = keyword.analysis(data.toString());
    // write event: 傳輸資料的事件
    socket.write(`${response}\r\n`, function () {
      console.log(`request: ${data}\nresponse:${response}, function: ${func}`);
    })

  })
});

keyword.loaddata(__dirname, "modules/keyword.list.js", ()=>{
  color.println("keyword list loading success", {fore:"blue"});
});

server.listen(3000, "0.0.0.0", ()=>{
  color.print("Server listen on ", {fore:"green"});
  color.println(`${_PORT}`, {fore:"green", sys:"bright"});
})