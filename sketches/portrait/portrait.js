let sourceText;
let poem;
let startIndex = 0;

//see bottom of page for the slider
var slider = document.getElementById("density");
var imgDen = 12;
var textFac = imgDen*1.5;



function preload(){
  me = loadImage("/photos/Edited_concertpic1.png");
  sourceText = loadStrings("/sketches/portrait/webtext.txt");

}

function setup() {
  createCanvas(me.width, me.height);
  var C = canvas;
  var render = C.getContext("2d");



  C.style.position = 'absolute';
  C.style.top = '20vw';
  C.style.left = '0%';

  C.style.width = '50vw';
  C.style.height = '50vw';

  C.style.border = 'solid orange .25cap';
  C.style.borderRadius = '2cap';
  C.style.padding = '1cap';


  poem = sourceText.join('  ');
  me.resize(width/imgDen, height/imgDen);
  textSize(50*textFac);
}
function resize() {
  me.resize(width/imgDen, height/imgDen);
  
  textSize(50*textFac);
}

function draw() {
  background ('none');
  frameRate(5);

  let w = width / me.width;
  let h = height / me.height;
  charIndex = startIndex;

  me.loadPixels();
  for (let j = 0; j < me.width*3; j++) {
    for (let i = 0; i < me.height; i++) {
      const pixelIndex = (i + j * me.width) * 4;
      const r = me.pixels[pixelIndex + 0];
      const g = me.pixels[pixelIndex + 1];
      const b = me.pixels[pixelIndex + 2];
      const avg = (r + g + b) / 3;

      noStroke();
      textAlign(CENTER, CENTER);
      fill(r, g, b)
      textSize(50);


      // charIndex = floor(map(avg, 0, 255, poem.length, 0))

      text(poem.charAt(charIndex % poem.length), i*w + w*0.5, j*h + h*0.5);
      charIndex++
      
      
    }
  }
  startIndex++;
}



window.addEventListener("resize", draw);
// window.addEventListener("resize", convertRange);

slider.addEventListener("change", resize)

//if you want it real-time, you can do this: 
setInterval(function() {
  imgDen = slider.value
}, 150)
