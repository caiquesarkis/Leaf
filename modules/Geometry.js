

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


export function Triangle(name, scene, vector){
    this.name = name
    this.update = function(){
        this.draw()
    }

    this.draw = function(){
        scene.ctx.beginPath();
        vector.map((point, index)=>{
            if(index == 0){
                scene.ctx.moveTo(point[0], point[1]);
            }else{
                scene.ctx.lineTo(point[0], point[1]);
            }
        })
        scene.ctx.closePath();
        scene.ctx.fillStyle = "#FFCC00";
        scene.ctx.fill();
    }

}



export function Polygon(name, scene, vector){
    this.name = name
    this.update = function(){
        this.draw()
    }

    this.draw = function(){
        scene.ctx.beginPath();
        vector.map((point, index)=>{
            if(index == 0){
                scene.ctx.moveTo(point[0], point[1]);
            }else{
                scene.ctx.lineTo(point[0], point[1]);
            }
        })
        scene.ctx.closePath();
        scene.ctx.fillStyle = "#FFCC00";
        scene.ctx.fill();
    }

}