//defining variable globally
var backgroundImg, back, invisible, rand
var cash, cashImg, cashGroup, coinSound
var logw, cactus, logImg, cactusImg
var runner, runnerImg, score
var tree, treeImg, failure
var cloud, cloudImg
var randomNo, gamestate
var treeGroup, cactusGroup, logGroup, cloudGroup
var reset, gameover, gameoverImg, resetImg

//loading Images and Sounds
function preload() {
  backgroundImg = loadImage("ground.png")
  runnerImg = loadImage("Runner.png")
  treeImg = loadImage("tree.png")
  cloudImg = loadImage("cloud.png")
  logImg = loadImage("logs.png")
  cactusImg = loadImage("cactus.png")
  gameoverImg = loadImage("gameover.png")
  resetImg = loadImage("reset.png")
  cashImg = loadImage("dollar.png")
  coinSound = loadSound("sound.mp3")
  
}

function setup() {
  //defining gamestate
  gamestate = "play"
  //Initiallly defining score as 0
  score = 0
  createCanvas(600, 600)
  //Creating sprites and adding images to it
  back = createSprite(300, 470, 10, 10)
  back.addImage(backgroundImg)
  back.velocityX = -10
  runner = createSprite(100, 490, 10, 10)
  runner.addImage(runnerImg)
  runner.scale = 0.4
  gameover = createSprite(300, 100)
  reset = createSprite(300, 300)
  reset.addImage(resetImg)
  gameover.addImage(gameoverImg)
  invisible = createSprite(100, 550, 100, 10)
  treeGroup = new Group()
  cactusGroup = new Group()
  logGroup = new Group()
  cloudGroup = new Group()
  cashGroup = new Group()


  reset.scale = 0.4
  //Setting Collider 
 runner.setCollider("circle", 20, 30, 60)

}

function draw() {

//to create never ending background
  if (back.x < 200) {
    back.x = 400
  }
  //creating a invisible ground to collide runner with ground
  if (invisible.x === 0) {
    invisible = 100
  }
  //fror making invisible ground invisible
  invisible.visible = false
  runner.velocityY = runner.velocityY + 0.8


  runner.collide(invisible)
  if (runner.isTouching(logGroup)) {
    gamestate = "end"

  }
  if (runner.isTouching(cactusGroup)) {

    gamestate = "end"

  }
  //defining the tasks executed in gamestate play and end respectively
  if (gamestate === "play") {
    gameover.visible = false
    reset.visible = false
    background("brown")
    spawntree()
    spawncloud()
    obstacles()
    if (keyDown("space") && runner.y === 509) {
      runner.velocityY = -15


    }
    coin()

  }
  if (gamestate === "end") {
    back.velocityX = 0
    treeGroup.setVelocityEach(0, 0)
    cloudGroup.setVelocityEach(0, 0)
    cactusGroup.setVelocityEach(0, 0)
    logGroup.setVelocityEach(0, 0)
    cashGroup.setVelocityEach(0, 0)
    logGroup.setLifetimeEach(-1)
    treeGroup.setLifetimeEach(-1)
    cloudGroup.setLifetimeEach(-1)
    cactusGroup.setLifetimeEach(-1)
    cashGroup.setLifetimeEach(-1)
    gameover.visible = true
    reset.visible = true

    background("black")

  }
  //rest button in execution
  if (mousePressedOver(reset)) {
    restart()
    cloudGroup.setLifetimeEach(0)
    cactusGroup.setLifetimeEach(0)
    logGroup.setLifetimeEach(0)
    treeGroup.setLifetimeEach(0)
    cashGroup.setLifetimeEach(0)
  }

//Adding score
  if (runner.isTouching(cashGroup)) {
    cashGroup.destroyEach()
    score = score + 10
    coinSound.play()
  }
  drawSprites()
  textSize(30)
  fill("white")
  text("Coins = " + score, 240, 50)


}
//creating obstacles,coins,clounds and trees through function()
function spawntree() {
  if (frameCount % 150 === 0) {
    tree = createSprite(random(100, 600), 440, 10, 10)
    tree.addImage(treeImg)
    tree.velocityX = -10
    tree.lifetime = 1200
    tree.scale = 0.5
    tree.depth = runner.depth
    runner.depth = runner.depth + 1
    treeGroup.add(tree)
  }
}

function spawncloud() {
  if (frameCount % 250 === 0) {
    cloud = createSprite(random(100, 600), 70, 10, 10)
    cloud.addImage(cloudImg)
    cloud.velocityX = -10
    cloud.lifetime = 1200
    cloudGroup.add(cloud)

  }
}

function obstacles() {
  randomNo = Math.round(random(1, 2))
  if (frameCount % 200 === 0) {
    if (randomNo === 1) {
      logw = createSprite(600, 520)
      logw.addImage(logImg)
      logw.velocityX = -10
      logw.scale = 0.2
      logGroup.add(logw)
      logw.depth = runner.depth
      runner.depth = runner.depth + 1
    }
    if (randomNo === 2) {
      cactus = createSprite(600, 490)
      cactus.addImage(cactusImg)
      cactus.velocityX = -10
      cactus.scale = 0.4
      cactus.depth = runner.depth
      runner.depth = runner.depth + 1
      cactusGroup.add(cactus)
    }
  }
}

function restart() {
  gamestate = "play"
  back.velocityX = -10
  score = 0

}

function coin() {
  rand = 1
  if (frameCount % 100 === 0) {
    if (rand === 1) {
      cash = createSprite(random(200, 600), 530)
      cash.addImage(cashImg)
      cash.scale = 0.1
      cash.velocityX = -10
      cash.lifetime = 1200
      cash.depth = runner.depth
      runner.depth = runner.depth + 1
      cashGroup.add(cash)

    }
  }
}