import { Vector2 } from "./Math.js";

export default function GameObject(name, scene, x, y) {
    this.sprite
    this.name = name
    this.animatedSprites = []
    this.geometry
    this.colider
    this.width
    this.height
    this.speed = 1
    this.velocity = new Vector2(0,0)
    this.aceleration = new Vector2(0,0)
    this.position = new Vector2(x,y)
    this.time = 0;
    this.deltaTime = 1;
    this.friction = 1

    
    this.update = function() {
      if(this.sprite){
        this.draw()
      }
      this.updateTime()
      this.move()
      this.updateColider()
      this.updateGeometry()
      
      this.updateAnimatedSprites()
    }


    this.updateTime = function(){
        this.time += this.deltaTime
    }


    this.updateColider = function(){
      if(this.colider){
        this.colider.update()
        this.colider.position = this.position
      }
    }

    this.addColider = function (colider){
      this.colider = colider
    }

    this.updateGeometry = function (){
      if(this.geometry){
        this.geometry.update()
        this.geometry.position = this.position
      }
      
    }

    this.addGeometry = function(geometry){
      this.geometry = geometry
    }

    this.draw = function(){
      scene.ctx.drawImage( this.sprite, this.position.x, this.position.y, this.width, this.height);
    }

    this.move = function (){
      this.position.x += this.velocity.x*scene.deltaTime;
      this.position.y += this.velocity.y*scene.deltaTime;
      this.velocity.x = this.velocity.x*this.friction + this.aceleration.x*scene.deltaTime;
      this.velocity.y = this.velocity.y*this.friction + this.aceleration.y*scene.deltaTime;

    }

    this.scale = function(scalar){
      this.width *= scalar
      this.height *= scalar
      if(this.geometry){
        this.geometry.width *= scalar
        this.geometry.height *= scalar
      }
      
    }

    this.addSprite = function(url){
      this.sprite = new Image()
      this.sprite.src = url;
      this.width = this.sprite.width;
      this.height = this.sprite.height;
    }

    this.addAnimatedSprite = function (object){
      this.animatedSprites.push(object)
    }

    this.updateAnimatedSprites = function(){
      this.animatedSprites?.map((sprite)=>{
        sprite.dx = this.position.x + this.width/2 - sprite.dWidth/2
        sprite.dy = this.position.y + this.height/2 - sprite.dHeight/2
        sprite.update()
      })
      
    }

  }