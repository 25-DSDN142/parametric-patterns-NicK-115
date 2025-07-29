//your parameter variables go here!

let star_offsetX = 50;
let star_offsetY = 50;

let star_width  = 100;
let star_height = 100;

let gradCircleSize = 60;

let gradCircleRepeats = 999;
let gradCircleColorRange = 5;

let gradCircleRandomPoints = true;
let gradCircleRandomCount = 10; //Will only function if gradCircleRandomPoints is true.

let gradCircleRandom_RandomBaseHue = true; //Will only function if gradCircleRandomPoints is true.
let gradCircleRandom_DesiredBaseHue = 15; //Will only function if gradCircleRandom_RandomBaseHue is false.

let gradCircleXPoints = []; //Leave empty if gradCircleRandomPoints is true.
let gradCircleYPoints = []; //Leave empty if gradCircleRandomPoints is true.
let gradCircleHuePoints = []; //Leave empty if gradCircleRandomPoints is true.





function setup_wallpaper(pWallpaper) {
  pWallpaper.output_mode(DEVELOP_GLYPH);
  pWallpaper.output_mode(GRID_WALLPAPER);
  
  pWallpaper.resolution(FIT_TO_SCREEN);
  pWallpaper.show_guide(true); //set this to false when you're ready to print

  //Grid settings
  pWallpaper.grid_settings.cell_width  = 200;
  pWallpaper.grid_settings.cell_height = 200;
  pWallpaper.grid_settings.row_offset  = 0;
}

function wallpaper_background() {
  background(128); //mid grey colour
}

function star(x,y, inverted=0, spikeSizeX=40,spikeSizeY=40, centerThicknessX=10,centerThicknessY=10) {

  //First Half
  colorMode(RGB);
  if (inverted == 0) {
    fill(255,255,255,128);
  } else {
    fill(0,0,0,128);
  }
  beginShape();
  vertex(x-centerThicknessX,y+centerThicknessY); //Spike Left
  vertex(x-spikeSizeX,y);

  vertex(x-centerThicknessX,y-centerThicknessY); //Spike Up
  vertex(x,y-spikeSizeY);

  vertex(x+centerThicknessX,y-centerThicknessY);
  endShape(CLOSE);


  //Second Half
  if (inverted == 0) {
    fill(0,0,0,128);
  } else {
    fill(255,255,255,128);
  }
  beginShape();
  vertex(x+centerThicknessX,y-centerThicknessY); //Spike Right
  vertex(x+spikeSizeX,y);

  vertex(x+centerThicknessX,y+centerThicknessY); //Spike Down
  vertex(x,y+spikeSizeY);

  vertex(x-centerThicknessX,y+centerThicknessY);
  endShape(CLOSE);

}



let star_x = 0;
let star_y = 0;
let inv = 0;

let baseCircleHue;

let circleRandX;
let circleRandY;
let circleRandHue;

let generatedCircleX;
let generatedCircleY;
let generatedCircleHue;


function create_CircleStartPoints(){
  colorMode(HSB);
  if (gradCircleRandomPoints === true) {
    for (let i = 0; i < gradCircleRandomCount; i++) {
      circleRandX = noise(0.05 * i) * 200;
      circleRandY = noise(0.05 * i) * 200;
      circleRandHue = noise(0)*360;

      gradCircleXPoints[i] = circleRandX;
      gradCircleYPoints[i] = circleRandY;
      if (gradCircleRandom_RandomBaseHue === true) {
        gradCircleHuePoints[i] = circleRandHue;
        baseCircleHue = circleRandHue;
        fill(circleRandHue,100,100);
      } else {
        gradCircleHuePoints[i] = gradCircleRandom_DesiredBaseHue;
        baseCircleHue = gradCircleRandom_DesiredBaseHue;
        fill(gradCircleRandom_DesiredBaseHue,100,100);
      }

      circle(circleRandX,circleRandY, gradCircleSize); 
    }
  } else {
    for (let i = 0; i < gradCircleXPoints.length; i++) {
        baseCircleHue = gradCircleHuePoints[i];
        fill(gradCircleHuePoints[i],100,100);
        circle(gradCircleXPoints[i],gradCircleXPoints[i], gradCircleSize); 
    } 
  }
}

function sprout_CircleGradient() {
  colorMode(HSB);
  for (let j = 0; j < gradCircleRepeats; j++){
    for (let i = 0; i < gradCircleXPoints.length; i++) {
      
      //Getting Array Values
      generatedCircleX = gradCircleXPoints[i];
      generatedCircleY = gradCircleYPoints[i];
      generatedCircleHue = gradCircleHuePoints[i];
    
      //Noise Offsetting Time!
      generatedCircleX = generatedCircleX + (noise(0.001 * j + (i*5))-0.5) * 1;
      generatedCircleY = generatedCircleY + (noise(0.001 * j + (i*5) + 99999)-0.5) * 1;
      generatedCircleHue = generatedCircleHue + (noise(0.05 * j + (i*5) + 999)-0.5) * 2;

      if (generatedCircleHue > baseCircleHue+gradCircleColorRange) {
        generatedCircleHue = baseCircleHue+gradCircleColorRange;
      } else if (generatedCircleHue < baseCircleHue-gradCircleColorRange) {
        generatedCircleHue = baseCircleHue-gradCircleColorRange;
      }

      fill(generatedCircleHue,100,100);
      circle(generatedCircleX,generatedCircleY, gradCircleSize); 

      //Update the Array Values
      gradCircleXPoints[i] = generatedCircleX;
      gradCircleYPoints[i] = generatedCircleY; 
      gradCircleHuePoints[i] = generatedCircleHue;
    
    }
  }
}

function my_symbol() { // do not rename this function. Treat this similarly to a Draw function
  noStroke();

  create_CircleStartPoints();
  sprout_CircleGradient();

  star(50,50, 0, star_width/2,star_height/2, star_width/8,star_height/8);
  star(150,50, 1, star_width/2,star_height/2, star_width/8,star_height/8);
  star(50,150, 1, star_width/2,star_height/2, star_width/8,star_height/8);
  star(150,150, 0, star_width/2,star_height/2, star_width/8,star_height/8);
}
