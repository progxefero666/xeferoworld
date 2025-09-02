//src\lib\audio\model\vowelsegment.ts

// En, por ejemplo, 'lib/audio-analysis.ts'

export class VowelSegment {
    public startTime: number; // en segundos
    public endTime: number;   // en segundos

    constructor(startTime: number, endTime: number) {
        this.startTime = startTime;
        this.endTime = endTime;
    }

    /**
     * Devuelve la duración del segmento vocal en segundos.
     */
    public get duration(): number {
        return this.endTime - this.startTime;
    }

    /**
     * Deserializador estático: Crea una instancia de VowelSegment desde un objeto JSON genérico.
     */
    public static fromJSON(data: any): VowelSegment {
        if (!data || typeof data.startTime !== 'number' || typeof data.endTime !== 'number') {
            throw new Error("Invalid data for VowelSegment deserialization");
        }
        return new VowelSegment(data.startTime, data.endTime);
    }
};//end class