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
      let objectFound = null
      Scene.gameObjects.map((object)=>{
        if(object.name == name){
          objectFound = object
        }
      })
      return objectFound
    }

    this.addObject = function(object){
      Scene.gameObjects.push(object)
      return object
    }

    this.deleteObject = function(gameObject){
      this.gameObjects = this.gameObjects.filter((object)=>{
        return object !== gameObject
      })
    }

    this.updateTime = function(){
        Scene.time += Scene.deltaTime
    }

    this.getCurrentTime = function(){
      return Scene.time
    }

    this.setTimeout = function(interval){
      return new Promise(function(myResolve, myReject) {
        setTimeout(function() { 
          myResolve("I love You !!"); 
        }, interval);
      });
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
        Scene.debugText()
        window.requestAnimationFrame(Scene.update, 1000/Scene.fps)
    }

    this.debugText = function (){
        Scene.ctx.font = "30px Arial";
        Scene.ctx.fillStyle = "red";
        Scene.ctx.textAlign = "center";
        Scene.ctx.fillText(`Current scene Time: ${Scene.time}`, Scene.width*0.8, Scene.height*0.1);
    }


    window.requestAnimationFrame(Scene.update,1000/this.fps);
}