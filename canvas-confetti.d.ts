declare module "canvas-confetti" {
    export interface Options {
        particleCount?: number;
        angle?: number;
        spread?: number;
        startVelocity?: number;
        decay?: number;
        gravity?: number;
        drift?: number;
        flat?: boolean;
        ticks?: number;
        origin?: { x: number; y: number };
        colors?: string[];
        shapes?: string[];
        zIndex?: number;
        disableForReducedMotion?: boolean;
        useWorker?: boolean;
        resize?: boolean;
        canvas?: HTMLCanvasElement | null;
        scalar?: number;
    }

    export type Shape = string;

    export function confetti(options?: Options): Promise<null>;
    
    export function create(
        canvas: HTMLCanvasElement,
        options?: Partial<Options>
    ): typeof confetti;

    export function shapeFromPath(options: { path: string; [key: string]: any }): void;
    
    export function shapeFromText(options: { text: string; [key: string]: any }): void;

    export default confetti;
}
