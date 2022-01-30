export default function Scene(name, width, height){  
    this.name = name
    this.dom = document
    this.dom.getElementById("canvas-container").innerHTML =`<canvas id="canvas" width=${width} height=${height}></canvas>`
    this.canvas = document.getElementById("canvas")
    this.ctx = this.canvas.getContext("2d")
    this.backgroundColor = "#171717";
    this.fps = 60
    this.gameObjects = []
    this.time = 0;
    this.deltaTime = 1;
    this.width = width;
    this.height = height;
    let Scene = this
    

    this.addEvent = function(event, callBackFunction){
      switch (event){
        case "keydown":
          this.dom.addEventListener(event, callBackFunction, false);
      }
      
    }

    this.getObject = function(name){
      let objectFound
      Scene.gameObjects.map((object)=>{
        if(object.name == name){
          objectFound = object.name
        }else{
          objectFound = null
        }
      })
      return objectFound
    }

    this.addObject = function(object){
      Scene.gameObjects.push(object)
      return object
    }

    this.deleteObject = function(object){
      Scene.gameObjects.pop(object)
    }

    this.updateTime = function(){
        Scene.time += Scene.deltaTime
    }

    

    this.drawBackground = function(){
        Scene.ctx.beginPath();
        Scene.ctx.fillStyle = this.backgroundColor;
        Scene.ctx.fillRect(0, 0, Scene.width, Scene.height);
        Scene.ctx.fill();
    }

    this.updateGameObjects = function(){
      Scene.gameObjects.map((gameObject)=>{
        gameObject.update()
      })
    }

    this.update = function (){
        Scene.ctx.clearRect(0, 0, Scene.width, Scene.height);
        Scene.drawBackground()
        Scene.updateGameObjects()
        Scene.updateTime()
        window.requestAnimationFrame(Scene.update, 1000/Scene.fps)
    }


    window.requestAnimationFrame(Scene.update,1000/this.fps);
}