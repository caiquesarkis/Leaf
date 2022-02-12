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


class Entity extends GameObject{
    constructor(name, scene, x, y){
        super(name, scene, x, y)
    }
    move(){
        super.move()
        if(this.geometry){
            if(this.position.x + this.geometry.radius > this.scene.width/2){
                this.position.x = this.scene.width/2 - this.geometry.radius
                this.velocity.x *= -1 
            }
            if(this.position.x - this.geometry.radius < - this.scene.width/2){
                this.position.x = this.geometry.radius - this.scene.width/2
                this.velocity.x *= -1 
            }
    
            if(this.position.y + this.geometry.radius > this.scene.height/2){
                this.position.y = this.scene.height/2 - this.geometry.radius
                this.velocity.y *= -1 
            }
            if(this.position.y - this.geometry.radius < -this.scene.height/2){
                this.position.y = this.geometry.radius - this.scene.height/2
                this.velocity.y *= -1 
            }
          }
    }
}


for(let i=0; i<20; i++){
    let entity = new Entity(`entity-${i}`, scene, 0, 0)
    entity.velocity = new Vector2(Math.random() - 0.5, Math.random()- 0.5).multiplyByScalar(10)
    entity.aceleration.y = -0.1
    let entityGeometry = new Circle(`entityGeometry-${i}`, scene,entity.position.x, entity.position.y, 10)
    entity.addGeometry(entityGeometry)
    scene.addObject(entity)
}

console.log("Scene",scene)