//your parameter variables go here!
//StarGrid
let starPairCount_H = 2; //WARNING: This will multiply the given value by 2.
let starPairCount_V = 2; //WARNING: This will multiply the given value by 2.

//GradientCircles
let gradCircleSize = 30;

let gradCircleRepeats = 250;
let gradCircleColorRange = 15;
let gradCircleSeedNumber = 7654; //Will be set to noise-generated if value is 0.

let gradCircleRandomPoints = true;
let gradCircleRandomCount = 50; //Will only function if gradCircleRandomPoints is true.

let gradCircleRandom_RandomBaseHue = false; //Will only function if gradCircleRandomPoints is true.
let gradCircleRandom_DesiredBaseHue = 210; //Will only function if gradCircleRandom_RandomBaseHue is false.

let gradCircleXPoints = []; //Leave empty if gradCircleRandomPoints is true.
let gradCircleYPoints = []; //Leave empty if gradCircleRandomPoints is true.
let gradCircleHuePoints = []; //Leave empty if gradCircleRandomPoints is true.


function setup_wallpaper(pWallpaper) {
  //pWallpaper.output_mode(DEVELOP_GLYPH);
  pWallpaper.output_mode(GRID_WALLPAPER);
  
  pWallpaper.resolution(NINE_LANDSCAPE);
  pWallpaper.show_guide(false); //set this to false when you're ready to print

  //Grid settings
  pWallpaper.grid_settings.cell_width  = 200;
  pWallpaper.grid_settings.cell_height = 200;
  pWallpaper.grid_settings.row_offset  = 0;
}

function wallpaper_background() {
  background(0); //black colour

  if (gradCircleSeedNumber != 0) {
  noiseSeed(gradCircleSeedNumber); //Checks if the noise seed parameter is given; if so, set the seed to this value.
  }

}

//StarGrid Formation
let star_width;
let star_height;
let star_x;
let star_y;
let star_invert = -1;

function starGrid(horiCount, vertiCount) {
    star_width = (200/(horiCount*2));
    star_height = (200/(vertiCount*2));
    for (let i = 0; i < vertiCount*2; i++) {
      for (let j = 0; j < horiCount*2; j++) {
        star_invert++;   
        star_x = (star_width/2)+(200/(horiCount*2))*j;
        star_y = (star_height/2)+(200/(vertiCount*2))*i;
        star(star_x,star_y, (star_invert % 2), star_width/2,star_height/2, star_width/8,star_height/8);
      }
    star_invert++;   
  }
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


//GradientCircle Formation
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
      circleRandX = gradCircleSize/2 + noise(0.05 * i) * (200-gradCircleSize);
      circleRandY = gradCircleSize/2 + noise(0.05 * i) * (200-gradCircleSize);
      
      gradCircleXPoints[i] = circleRandX;
      gradCircleYPoints[i] = circleRandY;

      circleRandHue = noise(0)*360;

      if (gradCircleRandom_RandomBaseHue === true) {
        gradCircleHuePoints[i] = circleRandHue;
        baseCircleHue = circleRandHue;
        fill(circleRandHue,100,100);
        if (i < 1) {
          console.log(baseCircleHue);
        }
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
      generatedCircleX = generatedCircleX + (noise(0.001 * j + (i*5))-0.5) * (2);
      generatedCircleY = generatedCircleY + (noise(0.001 * j + (i*5) + 99999)-0.5) * (2);
      generatedCircleHue = baseCircleHue + (noise(0.001 * j + (i*5) + 999)-0.5) * (2 * gradCircleColorRange);


      //Out of Bounds Check
      if (generatedCircleX > 200-gradCircleSize/2) {
        generatedCircleX = gradCircleSize/2;
      } else if (generatedCircleX < gradCircleSize/2) {
        generatedCircleX = 200-gradCircleSize/2;
      }

      if (generatedCircleY > 200-gradCircleSize/2) {
        generatedCircleY = gradCircleSize/2;
      } else if (generatedCircleY < gradCircleSize/2) {
        generatedCircleY = 200-gradCircleSize/2;
      }

      //Creates a circle at the new locationwith the new hue.
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

  create_CircleStartPoints(); //Places the Circle Points.
  sprout_CircleGradient(); //Starts the GradientCircle generation.

  starGrid(starPairCount_H, starPairCount_V); //Begins the StarGrid formation.
}
