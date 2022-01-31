
export function Text(scene, x, y, text, fontSize, color, name){
    this.name = name
    this.text = text
    this.x = x
    this.y = y
    this.fontSize = fontSize
    this.color = color
    this.update = function(){
        this.draw()
    }

    this.draw = function(){
        scene.ctx.font = this.fontSize + "px Arial";
        scene.ctx.fillStyle = this.color;
        scene.ctx.textAlign = "center";
        scene.ctx.fillText(this.text, this.x,this. y);
    }

}