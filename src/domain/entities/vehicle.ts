import type { Road } from './road';

export interface VehicleInterface {
    id: string;
    speed: number;
    route: Road[];
    type: string;
    currentRoad: Road;
}
export class Vehicle {

    constructor(
        options: VehicleInterface,
    ) {
        this.id = options.id;
        this.speed = options.speed;
        this.route = options.route;
        this.type = options.type;
        this.currentRoad = options.currentRoad;
    }
    readonly id: string;
    public speed: number;
    public route: Road[];
    public type: string;
    public currentRoad: Road;

    changeSpeed(newSpeed: number) {
        this.speed = newSpeed;
    }
    getSpeed() {
        return this.speed;
    }
}