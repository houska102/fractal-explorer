var redPreset = 100
var greenPreset = 150
var bluePreset = 255

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


onmessage = (event) => {
  var data = JSON.parse(event.data);
  const fractalInfo = data.fractalInfo
  const parts = data.parts
  let shiftX = data.shiftX
  let shiftY = data.shiftY
  let enlarge = data.enlarge
  let result = []

  const startValueY = fractalInfo.height/parts*data.id


  for (let y = 0; y < fractalInfo.height/parts; y++) {
    for (let x = 0; x<fractalInfo.width; x++) {
      computedY = y + startValueY
      const color = MandelbrotTest((x+shiftX)/enlarge, (computedY+shiftY)/enlarge ,fractalInfo.defaultzx, fractalInfo.defaultzy)
      result.push(color ? redPreset - color : 0)
      result.push(color ? greenPreset - color : 0)
      result.push(color ? bluePreset - color : 0)
      result.push(255)
    }
  }
  postMessage({id: data.id, result: result})
}
