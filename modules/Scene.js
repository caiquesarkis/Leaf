export default function Scene(name, width, height){  
    this.name = name
    this.dom = document
    this.dom.getElementById("canvas-container").innerHTML =`<canvas id="canvas" width=${width} height=${height}></canvas>`
    this.canvas = document.getElementById("canvas")
    this.ctx = this.canvas.getContext("2d")
    this.ctx.translate(width/2, height/2);
    this.ctx.scale(1, -1)

    this.backgroundColor = "#171717";
    this.fps = 144
    this.gameObjects = []
    this.time = 0;
    this.deltaTime = 1;
    this.width = width;
    this.height = height;
    this.debugMode = false
    
    let Scene = this
    
    this.update = function (){
      Scene.ctx.clearRect(0, 0, Scene.width, Scene.height);
      Scene.drawBackground()
      Scene.updateGameObjects()
      // Scene.handleColision()
      Scene.updateTime()
      if(Scene.debugMode){
        Scene.debugText()
      }
      
      window.requestAnimationFrame(Scene.update, 1000/Scene.fps)
  }





    this.handleColision = function(){
      // Checking colisions
      for(let i = 0; i<Scene.gameObjects.length; i++){
        for(let j = 0; j<Scene.gameObjects.length; j++){
          if(i!=j){

            let gameObject1 = Scene.gameObjects[i].position
            let gameObject2 = Scene.gameObjects[j].position
            if(gameObject1 && gameObject2){
              if((i != j) && (j > i)){
                let distance = gameObject1.distanceTo(gameObject2)
                let radiusSum = Scene.gameObjects[i].colider.radius + Scene.gameObjects[j].colider.radius
                console.log(distance - radiusSum)
                if( distance < radiusSum){
                  // Resolving colision
                  let midPointX = (gameObject1.x + gameObject2.x)/2
                  let midPointY = (gameObject1.y + gameObject2.y)/2
                  let distanceBetweenCircles = Math.sqrt((gameObject1.x - gameObject2.x)**2 + (gameObject1.y - gameObject2.y)**2)

                  gameObject1.x = midPointX + Scene.gameObjects[i].colider.radius * (gameObject1.x - gameObject2.x) / distanceBetweenCircles; 
                  gameObject1.y = midPointY + Scene.gameObjects[i].colider.radius * (gameObject1.y - gameObject2.y) / distanceBetweenCircles; 
                  
                

                  gameObject2.x = midPointX + Scene.gameObjects[j].colider.radius * (gameObject2.x - gameObject1.x) / distanceBetweenCircles; 
                  gameObject2.y = midPointY + Scene.gameObjects[j].colider.radius * (gameObject2.y - gameObject1.y) / distanceBetweenCircles;
                  

                  if(this.debugMode){
                    Scene.gameObjects[i].colider.strokeWith("red")
                    Scene.gameObjects[i].colider.strokeWith("red")
                  }
                  
                }else{
                  if(this.debugMode){
                    Scene.gameObjects[j].colider.strokeWith()
                    Scene.gameObjects[j].colider.strokeWith()
                  }
                }
              }
          }

          } 
        }
      }
    }




  this.setCanvasDimension = function(width, height){
    this.width = width
    this.height = height
  }

    this.addEvent = function(event, callBackFunction){
          this.dom.addEventListener(event, callBackFunction, false);      
    }

    this.removeEvent = function(event, callBackFunction){
      this.dom.removeEventListener(event, callBackFunction, false);      
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
        Scene.ctx.fillRect(-Scene.width/2, -Scene.height/2, Scene.width, Scene.height);
        Scene.ctx.fill();
    }

    this.updateGameObjects = function(){
      Scene.gameObjects.map((gameObject)=>{
        gameObject.update()
      })
    }


    this.debugText = function (){
        Scene.ctx.font = "30px Arial";
        Scene.ctx.fillStyle = "red";
        Scene.ctx.textAlign = "center";
        Scene.ctx.fillText(`Current scene Time: ${Scene.time}`, Scene.width*0.8, Scene.height*0.1);
    }



    window.requestAnimationFrame(Scene.update,1000/this.fps);
}