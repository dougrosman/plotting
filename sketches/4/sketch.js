let pdf;
let sizes = [];

function setup() {
  createCanvas(1152, 864, SVG);
  rectMode(CENTER);
  

  pdf = createPDF();
  pdf.beginRecord();

  const step = 30;

  for (let y = step*2 + ((height % step)); y < height - step*2; y += step) {
    for (let x = step*2 + ((height % step)); x < width - step*2; x += step) {

      const size = floor(random(step/10, step/1.25));
      sizes.push(size);
      //rect(x, y, step, step);
      noFill();
      ellipse(x, y, size, size);

      // if(y < height - (step * 3)) {
      //   line(x, y + size/2, x, y + step/2);
      // }

    }
  }

  // let i = 0;
  // for (let y = step*2 + ((height % step)); y < height - step*2; y += step) {
  //   for (let x = step*2 + ((height % step)); x < width - step*2; x += step) {


  //     const size = sizes[i];

  //     if(y < height - (step * 2)) {
  //       line(x, y + size/2, x, y + step/2);
  //     }

  //     i++;
  //   }
  // }


   pdf.save();
}

