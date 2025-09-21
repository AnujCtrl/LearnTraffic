import type { TrafficLightState } from '@shared/types/trafficLight';
import type { Road } from './road';
export interface TrafficLightInterface {
    id: string;
    state: TrafficLightState;
    cycleDuration: number;
    fromRoad: Road;
    toRoad: Road;
}
export class TrafficLight {
    constructor(options: TrafficLightInterface) {
        this.id = options.id;
        this.state = options.state;
        this.cycleDuration = options.cycleDuration;
        this.fromRoad = options.fromRoad;
        this.toRoad = options.toRoad;
    }
    readonly id: string;
    public state: TrafficLightState;
    readonly cycleDuration: number;
    readonly fromRoad: Road;
    readonly toRoad: Road;
    
    changeState(state: TrafficLightState) {
        this.state = state;
    }
    getState(): TrafficLightState {
        return this.state;
    }
    getCycleDuration(): number {
        return this.cycleDuration;
    }
}