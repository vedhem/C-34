const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ball;
var blower;
var blowerMouth;
var button;

function preload() {
  goalImg = loadImage("goalImg2.png");
  //congratsImg = loadImage("congrats.jpg");
}

function setup() {
  var canvas = createCanvas(500, 500);

  engine = Engine.create();
  world = engine.world;

  ball = new Ball(width/2 + 70, 0, 40, 40);

  blower = new Blower(width/2 , height/2 + 97, 90, 10);
  blowerMouth = new BlowerMouth(width/2 + 70, height / 2 + 80, 50, 45);

  blowerTwo = new Blower(width/2 + 167, height/2 - 70, 10, 90)
  blowerMouthTwo = new BlowerMouth(width/2 + 150, height/2 - 120, 45, 50);

  button = createButton("Click to Blow");
  button.position(width / 2, height - 80);
  button.class("blowButton");
  button.mousePressed(blow);

  button2 = createButton("Click to Blow");
  button2.position(width/2 + 200, height/2 - 70);
  button2.class("blowButton2");
  button2.mousePressed(horiBlow);

  goal = createSprite(width/2 - 200, height/2 -70, 5, 5);
  goal.addImage(goalImg);
  goal.scale = 0.4;
}

function draw() {
  background(59);
  drawSprites();
  Engine.update(engine);
  blower.show();
  ball.show();
  blowerMouth.show();
  blowerTwo.show();
  blowerMouthTwo.show();
  
  

  if (collide(ball, goal) === true) {
    congrats.visible = true;
  }

}

function blow() {

  Matter.Body.applyForce(ball.body, {x:0, y:0}, {x:0, y:0.02});

}

function horiBlow() {
  Matter.Body.applyForce(ball.body, {x:0, y:0}, {x:-0.05, y:0});
}

function collide(body, sprite) {
  if (body != null) {
    //console.log(body.body.position.x, sprite.position.x);
    var distance = dist(body.body.position.x, body.body.position.y, sprite.position.x, sprite.position.y);
    if (distance <= 20) {
      World.remove(engine.world, ball);
      ball = null;
      return true;
    }
    else {
      return false;
    }
  }
}

