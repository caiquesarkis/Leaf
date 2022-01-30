import { Vector2 } from "./Math.js";

export default function GameObject(name, scene, x, y) {
    this.sprite
    this.name = name
    this.animatedSprites = []
    this.width
    this.height
    this.velocity = new Vector2(0,0)
    this.aceleration = new Vector2(0,0)
    this.position = new Vector2(x,y)
    

    this.friction = 1
    
    this.update = function() {
      if(this.sprite){
        this.draw()
      }
      
      this.move()
      this.updateAnimatedSprites()
    }

    this.addSprite = function(url){
      this.sprite = new Image()
      this.sprite.src = url;
      this.width = this.sprite.width;
      this.height = this.sprite.height;
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

    this.scale = function(x,y){
      this.width *= x
      this.height *= y
    }

    this.addAnimatedSprite = function (object){
      this.animatedSprites.push(object)
    }

    this.updateAnimatedSprites = function(){
      this.animatedSprites.map((sprite)=>{
        sprite.dx = this.position.x + this.width/2 - sprite.dWidth/2
        sprite.dy = this.position.y + this.height/2 - sprite.dHeight/2
      })
    }

  }