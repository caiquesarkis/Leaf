export default function animateSprite(name ,url,scene, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight){
    this.name  = name
    this.image = new Image();
    this.image.src = url;
    this.sx = sx
    this.sy= sy
    this.dx = dx
    this.dy = dy
    this.dWidth = dWidth
    this.dHeight = dHeight
    this.sWidth = sWidth
    this.sHeight= sHeight
  
    this.numberOfSpritesX = Math.ceil(this.image.width/this.sWidth)
    this.running = false
  
    this.time = 0
    this.deltaTime =  1
    this.update = function (){
      if(this.running){
        this.animate()
  
        if(this.time ==  this.numberOfSpritesX){
          this.time = 0
          this.stop()
        }else{
          this.time += this.deltaTime
        }
        
      }else{
        this.idle()
      }
    }
  
    
  
    this.play = function(){
      if(!this.running){
        this.running = true
      }
    }
  
    this.stop = function(){
      this.running = false
    }
  
    this.idle = function(){
      scene.ctx.drawImage( this.image, 0, this.sy, this.sWidth, this.sHeight, this.dx, this.dy, this.dWidth, this.dHeight);
    }
  
    this.animate = function (){
      scene.ctx.drawImage( this.image, this.sWidth*this.time, this.sy, this.sWidth, this.sHeight, this.dx, this.dy, this.dWidth, this.dHeight);
    }  
  }
  