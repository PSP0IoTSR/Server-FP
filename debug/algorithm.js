#!/usr/bin/env node
let p = 11, q = 37;
let c = parseInt(process.argv[2])||41,  //0x41 = 'A' 
    d = parseInt(process.argv[3])||(7), //e = 103 
    n = parseInt(process.argv[4])||(p*q);

function algorithm(c, d, n){
  let Mtmp = 1;
  while(true){
    let m = c, s = 1;
    while(m<n){
      if(s==d)
        return (Mtmp*(m%n)%n);
      m*=c; //mul c
      s+=1; //inc s
    }
    let k = d;
    let a =    k % s;
    let b = ~~(k / s);
    Mtmp = (Mtmp*Math.pow(c, a))%n;
    c = m%n;
    d = b;
  }
}

console.log(algorithm(c, d, n));