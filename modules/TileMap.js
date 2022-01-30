export function TileMap(scene, color, x, y, type, tileMapSize) {
    this.type = type;
    if (type == "image") {
      this.image = new Image();
      this.image.src = color;
    }
    this.width = this.image.width;
    this.height = this.image.height;
    this.x = x;
    this.y = y;
    this.tileMapSize = tileMapSize
    this.atlas = []
    this.tiles = []




    
    this.registerTile = function (i,j,name){
        this.atlas.push({xCrop: i*this.tileMapSize, yCrop: j*this.tileMapSize, sWidth: this.tileMapSize, sWeight: this.tileMapSize, x: -100, y: 0, dWidth: this.tileMapSize, dHeight: this.tileMapSize, name: name})
    }

    this.createCell = function (newCell, x ,y){
        newCell = {...newCell}
        newCell.x = x*this.tileMapSize
        newCell.y = y*this.tileMapSize
        this.tiles.push(newCell)
    }


    this.loadMap = function (tileMap){
        tileMap = tileMap.split("\n")

        tileMap.map((line,index)=>{
        tileMap[index] = line.split("")
        })
        


        tileMap.map((line,j)=>{
            line.map((cell,i)=>{
                this.atlas.map((registeredTile)=>{
                    if(cell == registeredTile.name){
                        this.createCell(registeredTile, i, j)
                    }
                })
            })
        })

        console.log("Map loaded!", this.tiles)
    }
    
    this.update = function() {
      this.draw()
    }

    this.draw = function(){
      if (type == "image") {
          this.tiles.map((tile)=>{
                scene.ctx.drawImage(this.image,
                    tile.xCrop,
                    tile.yCrop,
                    tile.sWidth, 
                    tile.sWeight,
                    tile.x,
                    tile.y,
                    tile.dWidth, 
                    tile.dHeight,);
          })
        
      } else {
        scene.ctx.fillStyle = color;
        scene.ctx.fillRect(this.x, this.y, this.width, this.height);
      }
    }

  }