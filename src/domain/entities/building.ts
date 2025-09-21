import type { BuildingType } from '@shared/types/building';
export interface BuildingInterface {
    id: string;
    x: number;
    y: number;
    capacity: number;
    type: BuildingType;
}
export class Building {
    constructor(options: BuildingInterface) {
        this.id = options.id;
        this.x = options.x;
        this.y = options.y;
        this.capacity = options.capacity;
        this.type = options.type;
        this.currentOccupancy = 0;
    }
    readonly id: string;
    readonly x: number;
    readonly y: number;
    public currentOccupancy: number;
    readonly capacity: number;
    readonly type: BuildingType;
    getCurrentOccupancy(): number {
        return this.currentOccupancy;
    }
    getCapacity(): number {
        return this.capacity;
    }
    getType(): BuildingType {
        return this.type;
    }
    
}