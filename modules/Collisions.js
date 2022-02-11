import { Circle, Geometry, Polygon } from "./Geometry.js";
import { Vector2 } from "./Math.js";



export class Colider2d extends Circle{
    constructor(name, scene, gameObject , radius){   
        super(name, scene, gameObject.position.x, gameObject.position.y, radius)
    }
}