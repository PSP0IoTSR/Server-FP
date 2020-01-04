#!/usr/bin/env node
const net = require('net');
const crypto = require("../modules/algorithm.rsa");
const {android, linkit} = require("./device.key");
let device = null;
if(process.argv[2]=="android")
  device = android;
else if(process.argv[2]=="linkit")
  device = linkit;
else
  throw `${process.argv[2]} didn't exist}`;

let result = [];
if(process.argv[4])
  console.log(process.argv[3].split("").map(v=>v.charCodeAt()));
for(let m of process.argv[3].split("").map(v=>v.charCodeAt())){
  let c = crypto(m, device.dec, device.mod);
  if(process.argv[4])
    console.log("Message:",m,",",c);
  result.push(c);
}
if(process.argv[4])
for(let m of result){
  console.log(m);
  let c = crypto(m, device.key, device.mod);
  console.log("Message:",m,",",String.fromCharCode(c));
}
console.log(result.join(","));

var client = new net.Socket();
client.connect(3000, '127.0.0.1', function() {
	//console.log('Connected');
	client.write(result.join(",")+"\r\n");
});

client.on('data', function(data) {
  console.log("");
  console.log(process.argv[3].split("").map(v=>v.charCodeAt()).join(", "));
  console.log("Result:");
  console.log(data.toString());
	//console.log('Received: ' + data);
	client.destroy(); // kill client after server's response
});

client.on('close', function() {
});
