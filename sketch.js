var ghost,ghostStandImage,ghostJumpImage;
var tower,towerImage;
var doorGroup,door,doorImage;
var climber,climberImage,climberGroup;
var invisibleBlock,invisibleBlockGroup;
var edges;
var PLAY = 1;
var GAMEOVER = 0;
var gameState = 1;

function preload()
{
  ghostStandImage = loadImage("ghost-standing.png");
  ghostJumpImage = loadImage("ghost-jumping.png");
  towerImage = loadImage("tower.png");
  doorImage = loadImage("door.png");
  climberImage = loadImage("climber.png");
  ghostSound = loadSound("spooky.wav");
}

function setup()
{
  createCanvas(600,600);
  ghostSound.loop();
  tower = createSprite(300,300);
  tower.addImage(towerImage);
  tower.velocityY = 1;
  tower.y = tower.height/2;
  
  ghost = createSprite(300,300,50,50);
  ghost.addImage(ghostStandImage);
  ghost.scale = 0.4;
  
  doorGroup = new Group();
  climberGroup = new Group();
  invisibleBlockGroup = new Group();
  
    
  ghost.velocityY = 0;
  ghost.setCollider("rectangle",-30,23,80,250);
}

function draw()
{
  background("black");
  if(gameState === 1)
    {
      if(tower.y > 400)
        {
          tower.y = 300;
        }
  
      if(keyDown("right_arrow"))
        {
          ghost.x = ghost.x + 2.5;
        }
      if(keyDown("left_arrow"))
        {
          ghost.x = ghost.x - 2.5;
        }
      if(keyDown("space"))
        {
          ghost.velocityY = -5;
        }
      if(keyWentDown("space"))
        {
          ghost.addImage(ghostJumpImage);
        }
      if(keyWentUp("space"))
        {
          ghost.addImage(ghostStandImage);
        }

      ghost.collide(climberGroup);

      if(invisibleBlockGroup.isTouching(ghost)|| ghost.y > 600)
        {
          gameState = 0;
        }

      ghost.velocityY = ghost.velocityY + 0.8;
      spawnDoor();
      drawSprites();
    }
  
  
  if(gameState === 0)
     {
       stroke("red");
       fill("red")
       textSize(50);
       text("GAMEOVER",150,300);
       textSize(20);
       text("Press R to Restart",220,340);
       if(keyDown("R"))
         {
           gameState = 1;
           ghost.x = 300;
           ghost.y = 300;
           ghost.velocityY = 0;
         }
     }
}

function spawnDoor()
{
  if(frameCount%300 === 0)
    {
      door = createSprite(Math.round(random(100,500)),0);
      door.addImage(doorImage);
      door.velocityY = 1;
      door.lifetime = 660;
      doorGroup.add(door);
      door.depth = ghost.depth - 1;
      
      climber = createSprite(door.x,60);
      climber.addImage(climberImage);
      climber.velocityY = 1;
      climber.lifetime = 660;
      climberGroup.add(climber);
      climber.depth = ghost.depth - 1;
      
      invisibleBlock = createSprite(door.x,70,climber.width - 10,10);
      invisibleBlock.velocityY = 1;
      invisibleBlock.visible = false;
      invisibleBlockGroup.add(invisibleBlock);
      invisibleBlock.debug = true;
      invisibleBlock.lifetime = 660;
      
    }
}
