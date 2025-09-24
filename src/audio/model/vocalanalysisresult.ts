//src\lib\audio\model\vocalanalysisresult.ts

import { WordAnalysis } from "@/audio/model/wordanalysis";


export class VocalAnalysisResult {
    public words: WordAnalysis[];
    public sampleRate: number;

    constructor(sampleRate: number) {
        this.words = [];
        this.sampleRate = sampleRate;
    };//end

    public addWord(wordAnalysis: WordAnalysis) {
        this.words.push(wordAnalysis);
    };//end

    /**
     * Serializador: Convierte la instancia de la clase a un string JSON.
     */
    public toJsonString(): string {
        // El segundo y tercer argumento de stringify son para formatear el JSON, haciéndolo más legible
        return JSON.stringify(this, null, 2); 
    };//end

    /**
     * Deserializador estático: Crea una instancia de VocalAnalysisResult desde un string JSON.
     * Este es el que usarás en el cliente.
     */
    public static fromJsonString(jsonString: string): VocalAnalysisResult {
        const data = JSON.parse(jsonString);
        if (!data || !Array.isArray(data.words) || typeof data.sampleRate !== 'number') {
            throw new Error("Invalid JSON string for VocalAnalysisResult deserialization");
        }
        const result = new VocalAnalysisResult(data.sampleRate);
        result.words = data.words.map(WordAnalysis.fromJSON);
        return result;
    };//end

};//end