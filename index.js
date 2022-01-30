import GameObject from "./modules/GameObject.js";
import Scene from "./modules/Scene.js"
import animateSprite from "./modules/Sprites.js"
import { Line, Triangle } from "./modules/Geometry.js"
import { Vector2, toDegrees, toRadians } from "./modules/Math.js"

function movePlayer({key}){
  console.log(key)
  let direction = new Vector2()
  let speed = 2
  direction.multiplyByScalar(speed)
  switch (key){
    case "w":
      ball.velocity = direction.up()
      break
    case "s":
      ball.velocity = direction.down()
      break
    case "d":
      ball.velocity = direction.right()
      break
    case "a":
      ball.velocity = direction.left()
      break
    case " ":
      ball.animatedSprites[0].play()
      shootBullets(scene)
      break

    case "Alt":
      let bullet = scene.getObject("bullet")
      scene.deleteObject(bullet)
      break
  }
  
}


function shootBullets(scene){
  let animation = new animateSprite("animation","./Assets/BombExploding.png", scene, 0, 0,32, 64, 400, 200, 32, 64 )

  let bullet = new GameObject("bullet",scene, 100, 100);
  bullet.addSprite("./Assets/Player.png") // Idle
  bullet.addAnimatedSprite(animation) // Animation
  scene.addObject(bullet)
  console.log(scene)
}

let origin = new Vector2(0,0)
let myVector = new Vector2(500,200)
let myVector2 = new Vector2(30,50)


// Loading game assets
let scene = new Scene("Main",document.documentElement.clientWidth,document.documentElement.clientHeight)


let line = new Line("line",scene, origin, myVector)
let line2 = new Line("line2",scene, origin, myVector2)
let triangle = new Triangle("triangle",scene,[[450,300],[300,400],[700,500]])


let spriteExploding = new animateSprite("bomb-exploding","./Assets/BombExploding.png", scene, 0, 0,32, 64, 400, 200, 32, 64 )

let ball = new GameObject("ball",scene, 100, 100);
ball.addSprite("./Assets/Player.png")
ball.scale(0.1,0.1)
ball.velocity.multiplyByScalar(10)
ball.addAnimatedSprite(spriteExploding)





// Populating scene
scene.addObject(line2)
scene.addObject(line)
scene.addObject(triangle)
scene.addObject(ball)
scene.addObject(spriteExploding)
scene.addEvent("keydown",movePlayer)




// Showing scene properties
console.log("Current Scene: ",scene.name,scene)








