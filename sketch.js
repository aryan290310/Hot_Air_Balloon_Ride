var balloon, balloonImage1, balloonImage2;
var database;
var position;

function preload() {
  bg = loadImage("Images/cityImage.png");
  balloonImage1 = loadAnimation("Images/HotAirBallon01.png");
  balloonImage2 = loadAnimation(
    "Images/HotAirBallon01.png",
    "Images/HotAirBallon01.png",
    "Images/HotAirBallon01.png",
    "Images/HotAirBallon02.png",
    "Images/HotAirBallon02.png",
    "Images/HotAirBallon02.png",
    "Images/HotAirBallon03.png",
    "Images/HotAirBallon03.png",
    "Images/HotAirBallon03.png"
  );
}

//Function to set initial environment
function setup() {
  database = firebase.database();

  createCanvas(1500, 700);

  balloon = createSprite(250, 650, 150, 150);
  balloon.addAnimation("hotAirBalloon", balloonImage1);
  balloon.scale = 0.5;

  var ref = database.ref("position");
  ref.on("value", function (data) {
    position = data.val();
    balloon.x = position.x;
    balloon.y = position.y;
  });

  textSize(20);
}

// function to display UI
function draw() {
  background(bg);

  if (keyDown(LEFT_ARROW)) {
    writePosition(-10, 0);
    balloon.addAnimation("hotAirBalloon", balloonImage2);
  } else if (keyDown(RIGHT_ARROW)) {
    writePosition(10, 0);
    balloon.addAnimation("hotAirBalloon", balloonImage2);
  } else if (keyDown(UP_ARROW)) {
    writePosition(0, -10);
    balloon.addAnimation("hotAirBalloon", balloonImage2);
    
  } else if (keyDown(DOWN_ARROW)) {
    writePosition(0, +10);
    balloon.addAnimation("hotAirBalloon", balloonImage2);
    
  }

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!", 40, 40);
}
function writePosition(x, y) {
  database.ref("position").set({
    x: balloon.x + x,
    y: balloon.y + y,
  });
}
