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
          this.scene.addEvent('tick', callback)
          this.startTime = this.scene.time
          this.running = true    
          return new Promise((resolve, reject) => {
          this.interval = setInterval(() => {
          this.scene.dom.dispatchEvent(this.event)
          this.timeElapsed = this.scene.time - this.startTime 
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
      this.scene.removeEvent('tick', this.callback)
      
    }
  }
  