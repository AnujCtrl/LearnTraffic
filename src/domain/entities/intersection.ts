import type { Road } from './road';
import type { Vehicle } from './vehicle';
import type { TrafficLight } from './trafficLight';
export interface IntersectionInterface {
    id: string;
    x: number;
    y: number;
    type: string;
    roads: Road[];
    trafficLights: TrafficLight[];
}

export class Intersection {
        readonly id: string;
        readonly x: number;
        readonly y: number;
        readonly type: string;
        readonly roads: Road[]; //road connection to the intersection
        public isEmpty: boolean;
        readonly trafficLights: TrafficLight[];
    constructor(
        options: IntersectionInterface,
    ) {
        this.id = options.id;
        this.x = options.x;
        this.y = options.y;
        this.type = options.type;
        this.roads = options.roads;
        this.isEmpty = true;
        this.trafficLights = options.trafficLights;
    }
    getPosition(): [number, number] {
        return [this.x, this.y];
    }
    getType(): string {
        return this.type;
    }
    canHandleVehicle(): boolean {
        return this.isEmpty;
    }
    handleVehicle(vehicle: Vehicle,incomingRoad:Road) {
        this.isEmpty = false;
        const idx = vehicle.route.findIndex(road => road.id === incomingRoad.id);
        vehicle.currentRoad= vehicle.route[idx+1];
        incomingRoad.removeVehicle(vehicle.id);
    }
    releaseVehicle(vehicle: Vehicle) {
        this.isEmpty = true;
        vehicle.currentRoad.addVehicleAtEntry(vehicle.id);
    }
    getTrafficLight(fromRoad: Road,toRoad: Road): TrafficLight{
        return this.trafficLights.find(trafficLight => trafficLight.fromRoad === fromRoad && trafficLight.toRoad === toRoad) as TrafficLight;
    }
    getAllTrafficLights(): TrafficLight[] {
        return this.trafficLights;
    }
}

