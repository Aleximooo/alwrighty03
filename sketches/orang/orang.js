/**
 * This is a basic example of how to use the p5.asciify library, updating ascii options and font dynamically.
 * It renders a rotating 3D box into an ASCII representation.
 */

let sketchFramebuffer;

var hit = false;

function preload() {
  //Optionally load a custom font to use for the ASCII characters.
  //loadAsciiFont('path/to/your/font.ttf');
  	obj = loadModel('Orange.obj');
    tex = loadImage('Orange_BaseColor.png');
    shade = loadImage('Orange_Normal.png');

}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL); // WebGL mode is required currently
 
  sketchFramebuffer = createFramebuffer({ format: FLOAT });

  setAsciiOptions({
    // These are the default options, you can change them as needed in preload(), setup() or draw()
    common: {
      fontSize: 15,
    },
    
    ascii: {
      renderMode: "brightness",
      enabled: 1,
      characters: " .:-=+*#%@",
      characterColor: "red",
      characterColorMode: 1,
      backgroundColor: "white",
      backgroundColorMode: 1,
      invertMode: 0,
    },
    
  });
  
}

function draw() {

  /**
	Your creative code goes here to replace the following code, drawing to the graphic buffer.
	Currently, the code draws a Tim Rodenbroeker-esque rotating 3D box to the graphic buffer.
	Check out his courses on creative coding at https://timrodenbroeker.de/ (no affiliation, I just enjoyed his courses)
	**/
  sketchFramebuffer.begin();
  

  background(0);
  let c = color('rgb(240,240,245)');
  let c2 = color('rgb(100,100,100)');
  let lightDir = createVector(-1, -0.12, 90);
  directionalLight(c, lightDir);
  ambientLight('#F1E2E8');
  
  
  let lightDir3 = createVector(0, -1, 0);
  directionalLight(c2, lightDir3);
  
	orbitControl();
	rotateX(radians(frameCount * '5'));
	rotateZ(radians(frameCount * '.2'));
	noStroke();
    fill(255, 255, 255);
	  scale(-4);
    normalMaterial();
    texture(tex);
	  model(obj);

  sketchFramebuffer.end();

  image(sketchFramebuffer, -windowWidth/2, -windowHeight/2);
  
  
  
  
  
  // if (frameCount == 20000) {
  //   // Update the ascii rendering based on any conditions you like
  //   loadAsciiFont('path/to/your/font.ttf'); // Optionally update the font after the sketch has run for a while
    
	// 	setAsciiOptions({ // Optionally update any of the default options
	// 		common: {
	// 			fontSize: 2
	// 		},
	// 		edge: {
	// 			enabled: true // Edge detection anyone?
	// 		}
	// 	});
		
  //   }  
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
