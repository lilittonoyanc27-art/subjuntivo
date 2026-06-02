export interface ConjugationTable {
  pronoun: string;
  form: string;
}

export interface VerbInfo {
  verb: string;
  translation: string;
  type: 'regular-ar' | 'regular-er' | 'regular-ir' | 'irregular';
  conjugations: ConjugationTable[];
  example: { spanish: string; armenian: string };
}

export interface OptionQuestion {
  id: number;
  sentence: string; // "Quiero que Ana ___ (venir)"
  translation: string; // "Ես ուզում եմ, որ Անան գա:"
  options: string[]; // ["venga", "viene", "vienes"]
  correctIndex: number;
  explanation: string; // Armenian explanation
  category?: 'indicative' | 'subjunctive' | string;
}

export interface WeddingMatchItem {
  id: number;
  sentence: string; // e.g., "Espero que tengas suerte."
  translation: string; // e.g., "Հույս ունեմ, որ լավ օր ունենաս:"
  category: 'W' | 'E' | 'D' | 'D2' | 'I' | 'N' | 'G'; // WEDDING parts
  categoryName: string; // e.g., "Wishes" or "Emotions"
  explanation: string;
}

export interface DialogueStep {
  id: number;
  speaker: 'Ana' | 'Carlos';
  text: string; // "Quiero que ___ a mi casa mañana." (vengas / vienes)
  fullText: string; // "Quiero que vengas a mi casa mañana."
  translation: string; // "Ուզում եմ, որ վաղը գաս իմ տուն:"
  options: string[];
  correctIndex: number;
  explanation: string;
}
