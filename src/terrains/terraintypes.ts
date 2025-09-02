//src\terrains\terraintypes.ts

/**
 * branchingProbability:0.2 Probabilidad de que nazca un afluente en un segmento del río.
 * lengthReductionFactor:0.6 Cada nivel de afluente será este % más corto que su padre.
 * maxBranchAngle:60 Ángulo máximo (en grados) con el que un afluente se desvía de su padre.
 * displacementReduction:0.7 Factor de reducción para el desplazamiento máximo en cada nivel.
 * subdivisionReduction:0.8 Factor de reducción para el número de subdivisiones.
 */
export type TRiverConfig = {
    branchingProbability: number, 
    lengthReductionFactor: number, 
    maxBranchAngle: number, 
    displacementReduction: number,
    subdivisionReduction: number
 };