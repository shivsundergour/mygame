var path,mainCyclist;
var player1,player2,player3;
var pathImg,mainRacerImg1,mainRacerImg2,sky,skyimg;
var vwall,hwall,h2wall;
var oppPink1Img,oppPink2Img;
var oppRed1Img,oppRed2Img;
var gameOverImg,cycleBell;
var jump = 0 ;
var pinkCG,redCG; 
var score = 0 ;
var END =0;
var PLAY =1;
var gameState = PLAY;

var distance=0;
var gameOver, restart;

function preload(){
  pathImg = loadImage("unnamed.png");
  skyimg = loadImage("clear-blue-sky-clipart-2.jpg");
  mainRacerImg1 = loadAnimation("706687036dolphin-animation-4.gif");
  oppPink1Img = loadAnimation("shark.gif");
  oppRed1Img = loadAnimation("heli.gif");
  cycleBell = loadSound("sound/bell.mp3");
  gameOverImg = loadImage("images/gameOver.png");
}

function setup(){
  
  createCanvas(900,500);
  
  sky = createSprite(0,100)
  sky.addImage(skyimg);
  sky.velocityX = -4 ;
  sky.scale = 2;
  
  path=createSprite(100,300);
  path.addImage(pathImg);
  path.velocityX = -4;
  path.scale = 3.2 ;
  vwall = createSprite(400,250,10,900)
  vwall.visible = false ;
  hwall = createSprite(450,240,900,10)
  hwall.visible = false ;
  h2wall = createSprite(450,300,900,10)
  h2wall.visible = false ;
  mainCyclist  = createSprite(70,400);
  mainCyclist.addAnimation("SahilRunning",
                         mainRacerImg1);
  mainCyclist.scale=0.7;
 
  mainCyclist.setCollider("circle",0,0,(mainCyclist.height /2.5))
  
  gameOver = createSprite(650,150);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.8;
  gameOver.visible = false;  
  
  pinkCG = new Group();
  redCG = new Group();
  
}

function draw() {
  background(0);
  
  drawSprites();
  textSize(20);
  fill(255);
   text("Score: "+ score, 500,50);
  // camera.y = mainCyclist.y;
  if(gameState===PLAY){
    
   score = score + Math.round(getFrameRate()/60);
  // path.velocityX = -(2 + 2*distance/200);
  //sky.velocityX = -(2 + 2*distance/200);
     path.velocityX = -4;
     sky.velocityX = -4;
   if(keyDown("right_arrow")){
     mainCyclist.x = mainCyclist.x + 5
   }
   if(keyDown("left_arrow")){
     mainCyclist.x = mainCyclist.x - 5
   }
   if(keyDown("up_arrow")){
     mainCyclist.y = mainCyclist.y - 5
   }
   if(keyDown("down_arrow")){
     mainCyclist.y = mainCyclist.y + 5
   }
   if(path.x < 90 ){
    path.x = width/2;
  } 
   if(sky.x < 0 ){
    sky.x = width/2;
  }
   edges= createEdgeSprites();
   mainCyclist.collide(edges);
   mainCyclist.collide(vwall);
     
    if(jump === 0 ){
      mainCyclist.collide(hwall);
    }
    if(jump === 0&&mainCyclist.y < 260 ){
      mainCyclist.collide(hwall);
      mainCyclist.velocitY = 0;
    }
    if(jump === 1){
      mainCyclist.collide(h2wall);
    }
  if(keyDown("space")&&hwall.isTouching(mainCyclist) ) {
    jump = 1;
    mainCyclist.velocityY = -7
  }
  if (mainCyclist.y < 240){
       mainCyclist.velocityY = mainCyclist.velocityY + 0.25;
  }
     if(mainCyclist.y > 270){
       mainCyclist.velocitY = 0;
       jump =0;
    }
  
  if (World.frameCount % 150 == 0) {
      pinkCyclists();
    }
  
  if (World.frameCount === 100 || World.frameCount % 170 === 0) {
      redCyclists();
    }
    
   if(pinkCG.isTouching(mainCyclist)){
     gameState = END;
     player1.velocityY = 0;
    }
    
    if(redCG.isTouching(mainCyclist)){
      gameState = END;
      player3.velocityY = 0;
    }
    
}else if (gameState === END) {
    gameOver.visible = true;
    //Add code to show restart game instrution in text here
    text("Press Up Arrow to Restart the game!",480,200);
  
    path.velocityX = 0;
    sky.velocityX = 0;
    mainCyclist.velocityY = 0;
  
    pinkCG.setVelocityXEach(0);
    pinkCG.setLifetimeEach(-1);
  
    redCG.setVelocityXEach(0);
    redCG.setLifetimeEach(-1);
  
      if(keyDown("a")) {
      reset();
    }
}
}

function pinkCyclists(){
        player1 =createSprite(1100,Math.round(random(250,500)));
        player1.scale =0.4;
       
        player1.setCollider("circle",0,0,(player1.height ))
        player1.velocityX = -(6 + 2*distance/150);
        player1.addAnimation("opponentPlayer1",oppPink1Img);
        player1.setLifetime=170;
        pinkCG.add(player1);
}

function redCyclists(){
        player3 =createSprite(1100,Math.round(random(20, 230)));
        player3.scale =0.3;
        player3.velocityX = -(6 + 2*distance/150);
        player3.addAnimation("opponentPlayer3",oppRed1Img);
        player3.setLifetime=170;
        redCG.add(player3)
        player3.setCollider("rectangle",0,0,player3.width,(player3.height*2))
}

function reset(){
          
        mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
        gameState = PLAY ;
        distance=0;
        jump = 0;
        mainCyclist.x = 70;
        mainCyclist.y =400; 
        mainCyclist.changeAnimation("SahilRunning",mainRacerImg1);
        gameOver.visible = false ;
        redCG.destroyEach();
        yellowCG.destroyEach();
        pinkCG.destroyEach();
}




