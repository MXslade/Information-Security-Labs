export interface IRSAEncode {
  encodedText: string;
  encodedNumbers: number[];
  n: number;
  e: number;
  phi: number;
  k: number;
  d: number;
}

export interface IRSADecode {
  decodedText: string;
  encodedNumbers: number[];
  n: number;
  e: number;
  phi: number;
  k: number;
  d: number;
}

export interface Message {
  id?: number;
  sentTime: number;
  content: string;
}
