import { Vector2 } from "./Math.js";

export default class GameObject{
    constructor(name, scene, x, y){
      this.scene = scene
      this.sprite
      this.name = name
      this.animatedSprites = []
      this.geometry
      this.width
      this.height
      this.speed = 1
      this.velocity = new Vector2(0,0)
      this.aceleration = new Vector2(0,0)
      this.position = new Vector2(x,y)
      this.time = 0;
      this.deltaTime = 1;
      this.friction = 1
      this.isStatic = false
    }

    
    update() {
      if(this.sprite){
        this.draw()
      }
      this.updateTime()
      this.move()
      this.updateGeometry()
      
      this.updateAnimatedSprites()
    }


    updateTime(){
        this.time += this.deltaTime
    }

    updateGeometry(){
      if(this.geometry){
        this.geometry.update()
        this.geometry.position = this.position
      }
      
    }


    addGeometry(geometry){
      this.geometry = geometry
    }

    draw(){
      scene.ctx.drawImage( this.sprite, this.position.x, this.position.y, this.width, this.height);
    }

    move(){
      if(!this.isStatic){
        this.position.x += this.velocity.x*this.scene.deltaTime;
        this.position.y += this.velocity.y*this.scene.deltaTime;
        this.velocity.x = this.velocity.x*this.friction + this.aceleration.x*this.scene.deltaTime;
        this.velocity.y = this.velocity.y*this.friction + this.aceleration.y*this.scene.deltaTime;
      }
    }

    scale(scalar){
      this.width *= scalar
      this.height *= scalar
      if(this.geometry){
        this.geometry.width *= scalar
        this.geometry.height *= scalar
      }
      
    }

    addSprite(url){
      this.sprite = new Image()
      this.sprite.src = url;
      this.width = this.sprite.width;
      this.height = this.sprite.height;
    }

    addAnimatedSprite(object){
      this.animatedSprites.push(object)
    }

    updateAnimatedSprites(){
      this.animatedSprites?.map((sprite)=>{
        sprite.dx = this.position.x + this.width/2 - sprite.dWidth/2
        sprite.dy = this.position.y + this.height/2 - sprite.dHeight/2
        sprite.update()
      })
      
    }

  }
