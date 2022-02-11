export class Clock{
    // This clock can create a loop that runs at game time and returns a promisse.
    // Initialize the clock giving it a name and a scene.
    // After that, execute the tick method giving it a callback function, that will be executed every tick, and a time interval, for how much time do you want the clock to tick.
    // Since the clock returns a promisse the developer can execute some code at the end of the time interval.
    constructor(name, scene){
      this.name = name
      this.startTime = 0;
      this.endTime
      this.timeElapsed = 0
      this.deltaTime = 1
      this.scene = scene
      this.event = new Event('tick');
      this.interval
      this.callback
      this.running = false
      this.duration
    }

  
    tick(callback, deltaTime, duration ){
      this.duration = duration 
      this.deltaTime = deltaTime
      if(!this.running){
          this.callback = callback
          this.scene.addEvent('tick', callback)
          this.startTime = this.scene.time
          this.running = true    
          return new Promise((resolve, reject) => {
          this.interval = setInterval(() => {
            this.update()
          }, 1000/this.deltaTime);
        })
      }
    }

  update(){
    this.scene.dom.dispatchEvent(this.event)
    this.timeElapsed = this.scene.time - this.startTime 
    if(this.duration){
      if(this.timeElapsed > this.duration){
        this.stop()
        resolve()
      }
    }
  }

  stop(){
    this.running = false
    clearInterval(this.interval)
    this.scene.removeEvent('tick', this.callback)
    
  }
  }
  