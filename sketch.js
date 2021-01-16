var sword, swordImage;
var monster, monsterImage;
var fruit1, fruit2, fuit3, fruit4;
var fruit;
var r;

var score;

var fruitGroup;
var enemyGroup;

var PLAY = 1;
var END = 0;
var gameState = 1;

var gameOver;

function preload(){
  
  swordImage = loadImage("sword.png");
  monsterImage = loadAnimation("alien1.png", "alien2.png"); 
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  gameOverImage = loadImage("gameover.png");
}

function setup(){
  
  createCanvas(500, 500);
  
  //CREATING THE SWORD
  sword = createSprite(40, 200, 20, 20);
  sword.addImage(swordImage);
  sword.scale = 0.7;
  
  //SET COLLIDER FOR SWORD
  sword.setCollider("rectangle",0,0,40,40); 
  
  //SCORE
  score = 0;
  
  //CREATING THE GROUPS
  fruitGroup = createGroup();
  enemyGroup = createGroup();
    
}

function draw(){
  
  background("lightblue");
  
  if(gameState===PLAY){
    
    //CALL FRUITS AND ENEMY FUNCTION
   fruit();
    Enemy();
    
    //MOVE SWORD WITH MOUSE
    sword.y=World.mouseY;
    sword.x=World.mouseX;
    
    //INCREASE THE SCORE IF SWORD TOUCHES THE FRUIT
    if(fruitGroup.isTouching(sword)){
      fruitGroup.destroyEach();
      score = score + 3;
    }
    
    else
      
    {
    //GO TO THE END STSTE WHEN THE SWORD IS TOUCHING THE ENEMY
      if(enemyGroup.isTouching(sword)){
        gameState=END;
        
        fruitGroup.destroyEach();
        enemyGroup.destroyEach();
        
        fruitGroup.setVelocityXEach(0);
        enemyGroup.setVelocityXEach(0);
        
      // Change the animation of sword to gameover and reset its position
        sword.addImage(gameOverImage);
        sword.x=200;
        sword.y=200;
      }
    }
  }
  
  drawSprites();
  
   text("SCORE : "+ score,200,40);
}

function Enemy(){
  
  if(World.frameCount%200===0){
    monster=createSprite(400,200,20,20);
    monster.addAnimation("moving", monsterImage);
    monster.y=Math.round(random(100,300));
    monster.velocityX=-8;
    monster.setLifetime=50;
    
    enemyGroup.add(monster);
  }
}

function fruit(){
  
  if(World.frameCount%80===0){
    var fruit=createSprite(400,200,20,20);
    fruit.scale=0.2;
     //fruit.debug=true;
     r=Math.round(random(1,4));
    if (r == 1) {
      fruit.addImage(fruit1);
    } else if (r == 2) {
      fruit.addImage(fruit2);
    } else if (r == 3) {
      fruit.addImage(fruit3);
      } else {
      fruit.addImage(fruit4);
    }
    
    fruit.y=Math.round(random(50,340));
   
    fruit.velocityX=-7;
    fruit.setLifetime=100;
    
    fruitGroup.add(fruit);
  }
  
}