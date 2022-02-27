import Scene from './modules/Scene.js'
import { Circle } from './modules/Geometry.js'
import GameObject from './modules/GameObject.js'
import {Vector2} from './modules/Math.js'

let scene = new Scene("scene", window.innerWidth, window.innerHeight)

// Creating player

    // Player geometry
let circle = new Circle("circle", scene, 0, 0, 20)
circle.setPhysicsLayer(0)

    // Player game object
let player = new GameObject("player", scene, 0, 0)
player.addGeometry(circle)

    // Player2 geometry
let circle2 = new Circle("circle2", scene, 10, 0, 20)
circle2.setPhysicsLayer(0)

    // Player2 game object
let player2 = new GameObject("player2", scene, 10, 0)
player2.addGeometry(circle2)



// Adding objects to scene
scene.addObject(circle)
scene.addObject(player)
scene.addObject(circle2)
scene.addObject(player2)
