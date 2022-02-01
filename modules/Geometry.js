import { Vector2, toRadians } from "./Math.js";




export class Polygon{
    constructor(name, scene, x, y, vertices){
        this.name = name
        this.position = new Vector2(x || 0,y || 0)
        this.vertices = vertices
        this.radius = 100
        this.phase = - Math.PI/2
        this.scene = scene
        this.width = 1
        this.height = 1
        this.fill = "blue"
        this.stroke
    }

    update(){
        this.draw()
    }

    

    draw = function(){
        if(this.fill){
            this.scene.ctx.fillStyle = this.fill;
        }
        if(this.stroke){
            this.scene.ctx.strokeStyle = this.stroke;
        }
        
		let deltaAngle = 2*Math.PI/this.vertices;
 		this.scene.ctx.beginPath();
		this.scene.ctx.moveTo (this.position.x +  this.width*this.radius*Math.cos(0 + this.phase), this.position.y +  this.height*this.radius*Math.sin(0 + this.phase));          
 		for (var i = 1; i <= this.vertices; i++) {
			 this.scene.ctx.lineTo (this.position.x + this.width*this.radius*Math.cos(i * deltaAngle + this.phase), this.position.y + this.height*this.radius*Math.sin(i * deltaAngle + this.phase));
		}
        this.scene.ctx.closePath();

        if(this.fill){
            this.scene.ctx.fill()
        }
        if(this.stroke){
            this.scene.ctx.stroke();
        }
 		
        
    }

    strokeWith(color){
        this.stroke = color
    }

    fillWith(color){
        this.fill = color
    }
    scale(scalar){
        this.radius *= scalar
    }

    rotate(degree){
        this.phase += toRadians(degree)
    }
    

    

}


export class Line extends Polygon{
    constructor(name, scene, start, end){
        super(name, scene, 2)
        this.start = start
        this.end = end
    }
    draw = function(){
        this.scene.ctx.strokeStyle = this.stroke;
 		this.scene.ctx.beginPath();
		this.scene.ctx.moveTo(this.start.x, this.start.y);          
 		this.scene.ctx.lineTo(this.end.x,this.end.y)
        this.scene.ctx.closePath();
    	this.scene.ctx.stroke();
    }
}

export class Triangle extends Polygon{
    constructor(name, scene, x, y){
        super(name, scene, x, y, 3)
    }
}


export class Box extends Polygon{
    constructor(name, scene, x, y, width, height){
        super(name, scene, x, y, 4)
        this.phase = - Math.PI/4
        this.width = width || 50
        this.height = height || 50
        this.radius = 1
    }
}
