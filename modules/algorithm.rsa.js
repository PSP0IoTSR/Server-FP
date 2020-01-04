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

module.exports = algorithm;