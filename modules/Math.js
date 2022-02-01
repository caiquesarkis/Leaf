export class Vector2{
    constructor(x,y){
        this.x = x || 0
        this.y = y || 0
    }
    

    multiplyByScalar(_scalar){
        return new Vector2(this.x*_scalar, this.y*_scalar)
    }

    clone(){
        return new Vector2(this.x, this.y)
    }

    normalize(){
        return new Vector2(this.x/this.norm(), this.y/this.norm())
    }

    inverse(){
        return new Vector2(-1*this.x, -1*this.y)
    }

    add(_Vector2){
        return new Vector2(_Vector2.x + this.x,_Vector2.y + this.y)
    }

    dot(_Vector2){
        return this.x*_Vector2.x + this.y*_Vector2.y
    }

    norm(){
        return Math.sqrt(this.x**2 + this.y**2)
    }

    angle(direction){
        return Math.acos(this.dot(direction)/(this.norm()))
    }

    up(){
        return new Vector2(0,-1)
    }

    down(){
        return new Vector2(0,1)
    }

    left(){
        return new Vector2(-1,0)
    }

    right(){
        return new Vector2(1,0)
    }
}



export function toDegrees(radians){
    return 180*radians / Math.PI
}

export function toRadians(degrees){
    return Math.PI * degrees / 180
}

export function useVector(){
    return new Vector2()
}

