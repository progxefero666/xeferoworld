
//src\system3d\flysystem\flysystemutil.ts


import { GameConfig } from "@/app/universo/game/gameconfig";
import { Physic3D } from "src/system3d/physic";
import { FlyTelemetry } from "./flytelemetry";

import { DinamicUtil } from "@/math2d/functions/dinamicutil";
import { Player } from "@/app/universo/game/player/player";

/*
heading: azimut de la dirección de avance proyectada en el plano XZ. 
Con nuestra convención: 0 apunta a +Z y crece hacia la derecha (+X).
Heading ≈ yaw en planta (XZ). 

Yaw intensity 
..........................................................................
Δψ = ( g * SPEED_SCALE * tan(roll) / ( v * cos(pitch) ) ) * (1 / FRAME_RATE)

Por tanto, los “knobs” que más afectan a la intensidad de yaw (ordenados por impacto):
..........................................................................
    roll_angle y ROLL_MAX → entra como tan(roll) (no lineal; muy dominante).
    v (tu velocidad real) → a menor v, mayor yaw. (v = tickToMs(ln_velocity)).
    pitch_angle → reduce yaw vía cos(pitch).
    SPEED_SCALE → ganancia lineal directa sobre el yaw (sin tocar g real del radio).
    roll_velocity → sólo afecta lo rápido que alcanzas un roll alto (no la intensidad una vez estabilizado).
    FRAME_RATE → no cambia el yaw por segundo (se cancela con dt), sólo discretización.

Ejemplo numérico (para entender por qué lo ves suave):
..........................................................................
v=120, roll=0.8, pitch≈0, SPEED_SCALE=0.124 ⇒
yawRate ≈ 9.81*0.124*tan(0.8)/120 ≈ 0.010 rad/s (~0.6°/s). En 2 s apenas ~1.2°.
*/


/**
 * class FlySystemUtil.msToTick
 */
export class FlySystemUtil {

    public static msToTick(v_ms: number): number {
        return (v_ms / GameConfig.FRAME_RATE) * GameConfig.SPEED_SCALE;
    }//end

    public static tickToMs(ln_per_tick: number): number {
        return (ln_per_tick * GameConfig.FRAME_RATE) / GameConfig.SPEED_SCALE;
    }//end

    public static tickToKmH(ln_per_tick: number): number {//
        const velKmh= DinamicUtil.toKmHour(FlySystemUtil.tickToMs(ln_per_tick))
        return Math.floor(velKmh);
    }//end    

    public static computeTurnRadius(velocity: number, rollAngle: number): number {
        const t = Math.tan(rollAngle);
        if (Math.abs(t) < 1e-6) return Infinity;
        return (velocity * velocity) / (Physic3D.GRAVITY * t);
    }//end

    public static computeYawRate(velocity: number, rollAngle: number): number {
        const t = Math.tan(rollAngle);
        if (Math.abs(t) < 1e-6 || velocity <= 1e-9) return 0;
        const gScaled = Physic3D.GRAVITY * GameConfig.SPEED_SCALE;
        return GameConfig.YAW_GAIN * (gScaled * t / velocity); // rad/s
    }//end

    public static accToTickDelta(acc: number): number {
        // Δv_tick from acceleration per frame
        //dv--> m/s gained this frame
        const dt = 1 / GameConfig.FRAME_RATE;
        const dv = acc * dt;
        // convert to m/tick
        return FlySystemUtil.msToTick(dv);    
    }//end

    public static getTelemetry(machine:Player):FlyTelemetry {
        const physicVelocity = machine.getSpeedMs();
        const climbRate = physicVelocity * Math.sin(machine.pitch_angle);
        const turnRadius =FlySystemUtil.computeTurnRadius(machine.getSpeedMs(), machine.roll_angle);
        return new FlyTelemetry(
                        physicVelocity,
                        machine.ln_velocity,
                        machine.roll_angle,
                        machine.pitch_angle,
                        machine.getHeadingXZ(),
                        machine.getYawRate(),
                        turnRadius,
                        climbRate,
                        machine.glmachine!.position.y);
    }//end

}//end

/*
Fórmula de conversión de Mach a Kilómetros por hora
.........................................................
Kilómetros por hora = Mach * 1225.04398248
Cálculo de Mach a Kilómetros por hora
Kilómetros por hora = Mach * 1225.04398248
Kilómetros por hora = 1 * 1225.0439824819
Kilómetros por hora = 1225.04398
*/
