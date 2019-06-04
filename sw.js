function MandelbrotTest (cx, cy, defaultzx, defaultzy) {
  let zx,zy,zx2,zy2;    // komplexní proměnná Z
  let iter;                   // počet iterací
  zx=defaultzx;                               // vynulovat komplexní proměnnou C
  zy=defaultzy;
  const maxiter = 255
  const colorUnit = 255/maxiter
  iter=0;                           // nastavit počitadlo iterací

  while (iter<maxiter) {                                // iterační smyčka
      zx2=zx*zx;                      // zx^2
      zy2=zy*zy;                      // zy^2
      zy=2.0*zx*zy+cy;
      zx=zx2-zy2+cx;                  // z:=z^2+c
      iter++;
      if((zx2+zy2)>4.0){
        break;
      }        // zvýšit hodnotu počitadla iterací
  }
  if (iter==maxiter){                  // bod leží uvnitř Mandelbrotovy množiny
    return 0
  } else {
    return colorUnit*iter
  }                               // bod leží vně Mandelbrotovy množiny
}


self.addEventListener("message", (event) => {
  var data = JSON.parse(event.data);
  const fractalInfo = data.fractalInfo
  let shiftX = data.shiftX
  let shiftY = data.shiftY
  let enlarge = data.enlarge
  let result = []
  for (let x = 0; x<fractalInfo.width; x++) {
    result.push(new Array(fractalInfo.width))
    for (let y = 0; y<fractalInfo.height; y++) {
      const color = MandelbrotTest((x+shiftX)/enlarge, (y+shiftY)/enlarge ,fractalInfo.defaultzx, fractalInfo.defaultzy)
      result[x][y] = color
    }
  }
  event.source.postMessage(result)
});
