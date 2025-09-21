
import type { Building } from './building';

type VehicleId = string;

export class Block {
    constructor(
        readonly index: number,
        public vehicleId: VehicleId | null = null,
        readonly building: Building | null = null,
    ) {
    }
    isEmpty() {
        return this.vehicleId === null;
    }
    occupy(vehicleId: VehicleId) {
        if (!this.isEmpty()) {
            throw new Error(`Block ${this.index} is not empty`);
        }
        this.vehicleId = vehicleId;
    }
    release() {
        this.vehicleId = null;
    }
}
export interface RoadInterface {
    id: string;
    name?: string;
    length: number;
    lanes: number;
    speedLimit: number;
    blockCount: number;
    buildings: Building[];
}
export class Road {
    readonly blocks: Block[];
    readonly id: string;
    readonly name: string;
    readonly length: number;
    readonly lanes: number;
    readonly speedLimit: number;
    readonly blockCount: number;
    constructor(
       options: RoadInterface,
    ) {
        this.id = options.id;
        this.name = options.name ?? '';
        this.length = options.length;
        this.lanes = options.lanes;
        this.speedLimit = options.speedLimit;
        this.blockCount = options.blockCount;
        this.blocks = Array.from({ length: options.blockCount }, (_, i) => new Block(i, null));
    }
    getSpeedLimit(): number {
        return this.speedLimit;
    }
    getBlockCount(): number {
        return this.blockCount;
    }
    getLanes(): number {
        return this.lanes;
    }
    getLength(): number {
        return this.length;
    }
    canAddVehicleAtEntry(): boolean {
        return this.blocks[0].isEmpty();
    }
    addVehicleAtEntry(vehicleId: VehicleId) {
        this.blocks[0].occupy(vehicleId);
    }
    removeVehicle(vehicleId: VehicleId): number {
        const idx = this.blocks.findIndex(block => block.vehicleId === vehicleId);
        if (idx === undefined) {
            return -1;
        }
        this.blocks[idx].release();
        return idx;
    }
    moveVehicle(vehicleId: VehicleId, speed: number) {
        const idx = this.blocks.findIndex(block => block.vehicleId === vehicleId);
        if (idx === undefined) {
            return -1;
        }
        const newIdx = idx + speed;
        if (newIdx >= this.blocks.length) {
            return -1;
        }
        this.blocks[newIdx].occupy(vehicleId);
        this.blocks[idx].release();
        return newIdx;
    }
    getEmptyBlocksAhead(vehicleId: VehicleId): number {
        const idx = this.blocks.findIndex(block => block.vehicleId === vehicleId);
        if (idx === undefined) {
            return 0;
        }
        let counter = 0;
        for(let i = idx+1; i < this.blocks.length; i++) {
            if(this.blocks[i].isEmpty()) {
                counter++;
            } else {
                break;
            }
        }
        return counter;
        
    }
    snapshot(): Array<VehicleId | null> {
        return this.blocks.map(block => block.vehicleId);
    }
}