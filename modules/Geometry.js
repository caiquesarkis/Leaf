import { Vector2, toRadians, toDegrees } from "./Math.js";


export class Geometry{
    constructor(name, scene, x, y){
        this.name = name
        this.position = new Vector2(x || 0,y || 0)
        this.verticesCount = 0
        this.vertices = []
        this.scene = scene
        this.width = 1
        this.height = 1
        this.phase = 0
        this.radius = 10
        this.fill
        this.anchor = new Vector2(x || 0, y || 0)
        this.stroke = "white"
    }


    update(){
        this.draw()
    }

    draw = function(){
        this.scene.ctx.beginPath();

        this.vertices.map((vertex, index)=>{
            if(index == 0){
                this.scene.ctx.moveTo(this.position.x + vertex.x, this.position.y + vertex.y)
            }else{
                this.scene.ctx.lineTo(this.position.x + vertex.x, this.position.y + vertex.y)
            }
            
        })

        this.scene.ctx.closePath();

        

        if(this.fill){
            this.scene.ctx.fillStyle = this.fill;
            this.scene.ctx.fill()
        }

        if(this.stroke){
            this.scene.ctx.stroke();
            this.scene.ctx.strokeStyle = this.stroke; 
        }

        this.drawOrientationLine()
        
    }


    drawOrientationLine(){
        if(this.vertices.length != 0){
            this.scene.ctx.strokeStyle = "gray";
            this.scene.ctx.beginPath();
            this.scene.ctx.moveTo(this.position.x, this.position.y)
            this.scene.ctx.lineTo(this.position.x + this.vertices[0].x, this.position.y + this.vertices[0].y)
            this.scene.ctx.closePath();
            this.scene.ctx.stroke()
        }
    }

    addVertices(vertices){
        vertices.map((vertex)=>{
            this.vertices.push(vertex)
        })
    }

    scale(scalar){
        this.width *= scalar
        this.height *= scalar

        this.vertices.map((vertex)=>{
            vertex.x *= scalar
            vertex.y *= scalar
        })
        
    }

    rotate(angle){
        this.vertices.map((vertex, i)=>{
            let norm = vertex.norm()
            let phi = Math.atan2(vertex.y,vertex.x)




            vertex.x = norm* Math.cos(phi+angle)
            vertex.y = norm* Math.sin(phi+angle)
        })
    }


    strokeWith(color){
        this.stroke = color
    }

    fillWith(color){
        this.fill = color
    }


}

export class Polygon extends Geometry{
    constructor(name, scene, x, y, verticesCount){
        super(name, scene, x, y)
        this.verticesCount = verticesCount
        this.radius = 100
        this.vertices = []
        this.deltaAngle = 2*Math.PI/verticesCount

        for (var i = 1; i <= this.verticesCount; i++) {
            this.vertices.push(new Vector2(this.width*this.radius*Math.cos(i * this.deltaAngle + this.phase),this.height*this.radius*Math.sin(i * this.deltaAngle + this.phase)))
       }
    }

    update(){
        this.draw()
        this.updateGeometry()
    }

    updateGeometry(){
        this.vertices = []
        for (var i = 1; i <= this.verticesCount; i++) {
            this.vertices.push(new Vector2(this.width*this.radius*Math.cos(i * this.deltaAngle + this.phase),this.height*this.radius*Math.sin(i * this.deltaAngle + this.phase)))
       }
    }
    
    scale(scalar){
        this.radius *= scalar
    }

    rotate(degree){
        this.phase += toRadians(degree)
    }
}





export class Circle extends Geometry{
    constructor(name, scene, x, y, radius){
        super(name, scene, x, y)
        this.radius = radius
    }

    draw = function(){
        this.scene.ctx.beginPath();
        this.scene.ctx.arc(this.position.x,this.position.y,this.radius,0,2*Math.PI);
        this.scene.ctx.closePath();
        this.scene.ctx.stroke();

        

        if(this.fill){
            this.scene.ctx.fillStyle = this.fill;
            this.scene.ctx.fill()
        }

        if(this.stroke){
            this.scene.ctx.stroke();
            this.scene.ctx.strokeStyle = this.stroke; 
        }
    }
}