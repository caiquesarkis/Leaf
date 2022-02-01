import { Geometry, Polygon } from "./Geometry.js";
import { Vector2 } from "./Math.js";



export class Colider2d extends Geometry{
    constructor(name, scene, width, height){   
        super(name, scene, 0, 0)
        this.width = width
        this.height = height
        this.addVertices([
            new Vector2(this.width/2, this.height/2),
            new Vector2(-this.width/2, this.height/2),
            new Vector2(-this.width/2, -this.height/2),
            new Vector2(this.width/2, -this.height/2),
        ])
    }
}