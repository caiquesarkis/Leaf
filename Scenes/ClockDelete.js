import GameObject from "./modules/GameObject.js";
import Scene from "./modules/Scene.js"
import animateSprite from "./modules/Sprites.js"
import { Line, Polygon, Triangle, Box } from "./modules/Geometry.js"
import { Vector2, toDegrees, toRadians, useVector } from "./modules/Math.js"
import { Text } from "./modules/Debug.js"




export class Clock{
  constructor(name, scene){
    this.name = name
    this.startTime = 0;
    this.endTime
    this.timeElapsed = 0
    this.scene = scene
    this.event = new Event('tick');
    this.interval
    this.callback
    this.running = false
  }

  tick(callback, time){
    if(!this.running){
        this.callback = callback
        scene.addEvent('tick', callback)
        this.startTime = scene.time
        this.running = true    
        return new Promise((resolve, reject) => {
        this.interval = setInterval(() => {
        scene.dom.dispatchEvent(this.event)
        this.timeElapsed = scene.time - this.startTime 
        if(time){
          if(this.timeElapsed > time){
            this.stop()
            resolve()
          }
        }
        
      }, 1000/this.scene.fps);
    })
  }
}

  stop(){
    this.running = false
    clearInterval(this.interval)
    scene.removeEvent('tick', this.callback)
    
  }
}

// Loading game assets
let scene = new Scene("Main",document.documentElement.clientWidth,document.documentElement.clientHeight)
let clock = new Clock("enemyLifeSpanTimer",scene)
scene.debugMode = true

let playerSkeleton = new Polygon("playerSkeleton", scene, 200, 200, 20)
let player = new GameObject("player", scene, 200,200)
player.addGeometry(playerSkeleton)
player.scale(0.1)
player.geometry.fillWith("#6BBCD1")

let enemySkeleton = new Polygon("playerSkeleton", scene, 200, 200, 3)
let enemy = new GameObject("enemy", scene, 400,200)
enemy.addGeometry(enemySkeleton)
enemy.scale(0.2)
enemy.geometry.fillWith("#FEB938")

let points = [new Vector2(0,0), new Vector2(100,100)]
let line = new Line("line", scene, points[0], points[1])
line.strokeWith("white")




let floor = new Box("floor",scene, scene.canvas.clientWidth/2, scene.canvas.clientHeight - 50, scene.canvas.clientWidth*0.6, 10)
floor.fillWith("#FFF2CE") 
// Populating scene
scene.addObject(line)
scene.addObject(floor)
scene.addObject(enemy)
scene.addObject(player)


// Events


scene.addEvent("keydown", ({key})=>{
  let player =  scene.getObject("player")
  player.friction = 0.99
  switch (key){
    case "w":
        player.velocity =useVector().up().multiplyByScalar(player.speed)
      break
    case "a":
        player.velocity =useVector().left().multiplyByScalar(player.speed)
      break
    case "s":
        player.velocity =useVector().down().multiplyByScalar(player.speed)
      break
    case "d":
        player.velocity =useVector().right().multiplyByScalar(player.speed)
      break   
  }
})

scene.addEvent("mousemove", (event)=>{
  let player =  scene.getObject("player")
  let line =  scene.getObject("line")
  let currentCursorPoint = new Vector2(event.clientX, event.clientY)

  let playerCursorDirection = currentCursorPoint.add(player.position.inverse()).normalize()
  line.start = player.position
  line.end = playerCursorDirection.multiplyByScalar(30).add(player.position)
})


scene.addEvent("mousedown", ({button})=>{
  if(button == 0){
    let line = scene.getObject("line")
    let player =  scene.getObject("player")
    let currentCursorPoint = new Vector2(event.clientX, event.clientY)

    let playerCursorDirection = currentCursorPoint.add(player.position.inverse()).normalize()
    let bulletSkeleton = new Polygon('bulletSkeleton', scene, 400, 600, 6)
    let bullet = new GameObject("bullet", scene, 0,0)
    bullet.addGeometry(bulletSkeleton)
    bullet.position = line.end.clone()
    bullet.velocity = playerCursorDirection.multiplyByScalar(10).clone()
    bullet.scale(0.05)
    scene.addObject(bullet)

         
      clock.tick(()=>{
        let enemy = scene.getObject("enemy")
        if(enemy){
          enemy.geometry.phase += 0.03
          enemy.velocity = new Vector2(Math.random()*1.1 - 1, Math.random()*1.1 - 1)
          enemy.geometry.radius = Math.random()*20 + 100
        }
      }, 100)?.then(()=>{
        scene.deleteObject(scene.getObject('enemy'))
      })

    

  }
})








// Showing scene properties
console.log("Current Scene: ",scene.name,scene)






