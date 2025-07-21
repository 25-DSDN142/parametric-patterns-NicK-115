//your parameter variables go here!
let star_x  = 100;
let star_y  = 100;

let star_width  = 40;
let star_height = 40;


function setup_wallpaper(pWallpaper) {
  pWallpaper.output_mode(DEVELOP_GLYPH);
  //pWallpaper.output_mode(GRID_WALLPAPER);
  
  pWallpaper.resolution(FIT_TO_SCREEN);
  pWallpaper.show_guide(true); //set this to false when you're ready to print

  //Grid settings
  pWallpaper.grid_settings.cell_width  = 200;
  pWallpaper.grid_settings.cell_height = 200;
  pWallpaper.grid_settings.row_offset  = 50;
}

function wallpaper_background() {
  background(240, 255, 240); //light honeydew green colour
}

function star_A(x,y, Color2R=0,Color2G=0,Color2B=0, spikeSizeX=40,spikeSizeY=40, centerThicknessX=10,centerThicknessY=10) {

  //First Half

  beginShape();
  vertex(x-centerThicknessX,y+centerThicknessY); //Spike Left
  vertex(x-spikeSizeX,y);

  vertex(x-centerThicknessX,y-centerThicknessY); //Spike Up
  vertex(x,y-spikeSizeY);

  vertex(x+centerThicknessX,y-centerThicknessY);
  endShape(CLOSE);


  //Second Half
  fill(Color2R,Color2G,Color2B);
  beginShape();
  vertex(x+centerThicknessX,y-centerThicknessY); //Spike Right
  vertex(x+spikeSizeX,y);

  vertex(x+centerThicknessX,y+centerThicknessY); //Spike Down
  vertex(x,y+spikeSizeY);

  vertex(x-centerThicknessX,y+centerThicknessY);
  endShape(CLOSE);

}

/*function star_B() {
  ellipse(100,100, 20,80);
}*/

function my_symbol() { // do not rename this function. Treat this similarly to a Draw function
  noStroke();
  fill(255,85,0);
  star_A(star_x,star_y, star_width/2,star_height/2, star_width/8,star_height/8);
  //star_B();

}
