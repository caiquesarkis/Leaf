import GameObject from "./modules/GameObject.js";
import Scene from "./modules/Scene.js"
import animateSprite from "./modules/Sprites.js"
import {Polygon, Geometry, Circle } from "./modules/Geometry.js"
import { Vector2, toDegrees, toRadians, useVector } from "./modules/Math.js"
import { Text } from "./modules/Debug.js"
import { Clock } from "./modules/Clock.js"
import { Colider2d } from "./modules/Collisions.js";




// Colision detection

let scene = new Scene('colision-detection', document.documentElement.clientWidth, document.documentElement.clientHeight)
scene.debugMode = false

let entity = new GameObject('entity', scene, 0, 0)
entity.velocity = new Vector2(Math.random() - 0.5, Math.random()- 0.5)
let entityGeometry = new Circle('entityGeometry', scene,entity.position.x, entity.position.y, 10)
entity.addGeometry(entityGeometry)
scene.addObject(entity)



console.log(entity.prototype)




function applyBoundaryCondidtionsTo(gameObject){
    if(gameObject.geometry){
        if(gameObject.position.x + gameObject.geometry.radius > gameObject.canvas.width){
        gameObject.position.x = gameObject.canvas.width - gameObject.geometry.radius
        gameObject.velocity.x *= -1 
        }
        if(gameObject.position.x - gameObject.geometry.radius < 0){
            gameObject.position.x = gameObject.geometry.radius
            gameObject.velocity.x *= -1 
        }

        if(gameObject.position.y + gameObject.geometry.radius> gameObject.canvas.height){
            gameObject.position.y = gameObject.canvas.height - gameObject.geometry.radius
            gameObject.velocity.y *= -1 
        }
        if(gameObject.position.y - gameObject.geometry.radius < 0){
            gameObject.position.y = gameObject.geometry.radius
            gameObject.velocity.y *= -1 
        }
      }
}






console.log("Scene",scene)