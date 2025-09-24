
// A simplified interface for a voice returned from the Text-to-Speech API
export interface VoiceOption {
  languageCodes: string[];
  name: string;
  ssmlGender: 'SSML_VOICE_GENDER_UNSPECIFIED' | 'MALE' | 'FEMALE' | 'NEUTRAL';
  naturalSampleRateHertz: number;
}

// Options for the speech synthesis request
export interface SynthesizeRequestOptions {
  text: string;
  languageCode: string;
  voiceName: string;
  ssmlGender: 'MALE' | 'FEMALE' | 'NEUTRAL';
}

// Defines the gender options available for filtering
export type GenderFilter = 'ALL' | 'MALE' | 'FEMALE' | 'NEUTRAL';
