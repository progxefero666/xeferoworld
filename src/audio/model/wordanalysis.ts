//src\lib\audio\model\wordanalysis.ts

import { VowelSegment } from "@/audio/model/vowelsegment";


export class WordAnalysis {
    public word: string;
    public startTime: number; // Tiempo de inicio de la palabra
    public endTime: number;   // Tiempo de fin de la palabra
    public vowelSegments: VowelSegment[];

    constructor(word: string, startTime: number, endTime: number) {
        this.word = word;
        this.startTime = startTime;
        this.endTime = endTime;
        this.vowelSegments = []; // Inicializamos como un array vacío
    }
    
    public addVowelSegment(segment: VowelSegment) {
        this.vowelSegments.push(segment);
    }

    /**
     * Deserializador estático: Crea una instancia de WordAnalysis desde un objeto JSON genérico.
     */
    public static fromJSON(data: any): WordAnalysis {
        if (!data || typeof data.word !== 'string' || typeof data.startTime !== 'number' || typeof data.endTime !== 'number' || !Array.isArray(data.vowelSegments)) {
            throw new Error("Invalid data for WordAnalysis deserialization");
        }
        const wordAnalysis = new WordAnalysis(data.word, data.startTime, data.endTime);
        wordAnalysis.vowelSegments = data.vowelSegments.map(VowelSegment.fromJSON);
        return wordAnalysis;
    }
};//end