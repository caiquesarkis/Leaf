export function Vector2(x,y){
    this.x = x || 0
    this.y = y || 0

    this.multiplyByScalar = function(scalar){
        this.x *= scalar || 1
        this.y *= scalar || 1
    }

    this.dot = function (Vector2){
        return this.x*Vector2.x + this.y*Vector2.y
    }

    this.norm = function(){
        return Math.sqrt(this.x**2 + this.y**2)
    }

    this.angle = function(direction){
        return Math.acos(this.dot(direction)/(this.norm()))
    }

    this.up = function(){
        return new Vector2(0,-1)
    }

    this.down = function(){
        return new Vector2(0,1)
    }

    this.left = function(){
        return new Vector2(-1,0)
    }

    this.right = function(){
        return new Vector2(1,0)
    }
}



export function toDegrees(radians){
    return 180*radians / Math.PI
}

export function toRadians(degrees){
    return Math.PI * degrees / 180
}



