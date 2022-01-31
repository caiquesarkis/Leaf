import { Vector2, toRadians } from "./Math.js";


export function Point(x,y){
    return new Vector2(x,y)
}


export function Line(name, scene, from, to){
    this.name = name
    this.update = function(){
        this.draw()
    }

    this.draw = function(){
        scene.ctx.strokeStyle = 'red';
        scene.ctx.lineWidth = 2;
        scene.ctx.beginPath();
        scene.ctx.moveTo(from.x, from.y);
        scene.ctx.lineTo(to.x, to.y);
        scene.ctx.stroke();
    }

}

export function Polygon(name, scene, x, y, vertices){
    this.name = name
    this.position = new Vector2(x,y)
    this.vertices = vertices
    this.radius = 100
    this.phase = 1

    this.update = function(){
        this.draw()
    }

    this.scale = function (scalar){
        this.radius *= scalar
    }

    this.rotate = function(degree){
        this.phase += toRadians(degree)
    }

    this.draw = function(){
        scene.ctx.fillStyle = "#FFCC00";
		let deltaAngle = 2*Math.PI/this.vertices;
 		scene.ctx.beginPath();
		scene.ctx.moveTo (this.position.x +  this.radius*Math.cos(0 + this.phase), this.position.y +  this.radius*Math.sin(0 + this.phase));          
 		for (var i = 1; i <= this.vertices; i++) {
			 scene.ctx.lineTo (this.position.x + this.radius*Math.cos(i * deltaAngle + this.phase), this.position.y + this.radius*Math.sin(i * deltaAngle + this.phase));
		}
 		scene.ctx.stroke();
        
    }

}