import GameObject from "./modules/GameObject.js";
import Scene from "./modules/Scene.js"
import animateSprite from "./modules/Sprites.js"
import { Line, Polygon } from "./modules/Geometry.js"
import { Vector2, toDegrees, toRadians } from "./modules/Math.js"
import { Text } from "./modules/Debug.js"







// Loading game assets
let scene = new Scene("Main",document.documentElement.clientWidth,document.documentElement.clientHeight)
let player = new GameObject("player", scene, 0, 0)
let regularPolygon = new Polygon("regularPolygon", scene, 200, 200, 3)
regularPolygon.scale(0.5)
// Populating scene
scene.addObject(regularPolygon)
scene.addObject(player)
scene.addObject(new Text(scene, 100,100 , "mouse", 12, "white", "mouseText"))

scene.canvas.addEventListener("mousemove", (event)=>{
  let mouseText = scene.getObject("mouseText")
  mouseText.text = `x: ${event.clientX} y: ${event.clientX}`
  mouseText.x = event.clientX
  mouseText.y = event.clientY - 15

  let regularPolygon = scene.getObject("regularPolygon")
  regularPolygon.position = new Vector2(event.clientX, event.clientY) 
  regularPolygon.rotate(regularPolygon.position.norm()/500)
  regularPolygon.radius = regularPolygon.position.norm()/10
})




// Showing scene properties
console.log("Current Scene: ",scene.name,scene)






