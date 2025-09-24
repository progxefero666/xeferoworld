//src\system3d\flysystem\flytelemetry.ts

/**
 * class FlyTelemetry
 */
export class FlyTelemetry {

    public physicalVelocity: number;

    public ln_velocity: number;
    public roll_angle: number;
    public pitch_angle: number;
    public heading: number;
    public yawRate: number
    public turnRadius: number;
    public climbRate: number
    public altitude: number

    constructor(physicalVelocity: number,
                ln_velocity: number,
                roll_angle: number, 
                pitch_angle: number,
                heading: number,
                yawRate: number,    
                turnRadius: number,
                climbRate: number,
                altitude: number) {

        this.physicalVelocity = physicalVelocity;
        this.ln_velocity = ln_velocity;
        this.roll_angle = roll_angle;
        this.pitch_angle = pitch_angle;
        this.heading = heading;
        this.yawRate = yawRate;
        this.turnRadius = turnRadius;
        this.climbRate = climbRate;
        this.altitude = altitude;
    }//end

    public toConsole(label?: string): void {
        const R = this.turnRadius;
        //if (label) console.log(`--- ${label} ---`);
        console.log('.........................................');
        //console.log(`speed:       ${this.physicalVelocity.toFixed(2)}`);
        //console.log(`ln:          ${this.ln_velocity.toFixed(3)}`);
        //console.log(`roll:        ${this.roll_angle.toFixed(4)}`);
        //console.log(`pitch:       ${this.pitch_angle.toFixed(4)}`);
        //console.log(`heading:     ${this.heading.toFixed(4)}`);
        console.log(`yawRate:     ${this.yawRate.toFixed(4)}`);
        console.log(`turnRadius:  ${Number.isFinite(R) ? R.toFixed(2) : 'INF'}`);
        //console.log(`climbRate:   ${this.climbRate.toFixed(3)}`);
        //console.log(`altitude:    ${this.altitude.toFixed(2)}`);
    }

}//end