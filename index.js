import GameObject from "./modules/GameObject.js";
import Scene from "./modules/Scene.js"
import animateSprite from "./modules/Sprites.js"
import {Polygon, Geometry } from "./modules/Geometry.js"
import { Vector2, toDegrees, toRadians, useVector } from "./modules/Math.js"
import { Text } from "./modules/Debug.js"
import { Clock } from "./modules/Clock.js"
import { Colider2d } from "./modules/Collisions.js";



// Colision detection

let scene = new Scene('colision-detection', document.documentElement.clientWidth, document.documentElement.clientHeight)


let colider = new Colider2d('player-hitbox', scene, 400, 20)



console.log(colider)
let player = new GameObject("player", scene, 0, 0)
player.addColider(colider)
scene.addObject(player)

let clock = new Clock("rotate-player", scene)

clock.tick(()=>{
    colider.rotate(toRadians(1))
})





console.log("Scene",scene)