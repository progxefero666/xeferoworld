
import useGamepads from '@/lib/gamepad/useGamepads';
import { GamepadsContext,GamepadsProvider } from '@/lib/gamepad/GamepadContext';
import { GamepadContext, Gamepads, GamepadRef } from '@/lib/gamepad/types';

export const GAMEPAD_DEADZONE = 0.1;
// Lista oficial de botones Gamepad API (Xbox Controller)
export const GAMEPAD_BUTTONS = [
    "A",           // 0
    "B",           // 1
    "X",           // 2
    "Y",           // 3
    "LB",          // 4 (Left Bumper)
    "RB",          // 5 (Right Bumper)
    "LT",          // 6 (Left Trigger)
    "RT",          // 7 (Right Trigger)
    "Back",        // 8
    "Start",       // 9
    "LS",          // 10 (Left Stick Button)
    "RS",          // 11 (Right Stick Button)
    "DPadUp",      // 12
    "DPadDown",    // 13
    "DPadLeft",    // 14
    "DPadRight",   // 15
    "Guide"        // 16 (Xbox/Guide)
];

export {
    useGamepads,
    GamepadsProvider,
    GamepadsContext
};    

export type {
    GamepadContext, 
    Gamepads,
    GamepadRef
};

