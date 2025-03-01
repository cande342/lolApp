export interface BestSupport {
    name: string;
    winrate: number;
    games: number;
  }
  
export interface BestSupportsResponse {
    adc: string;
    best_supports: BestSupport[];
  }

  export interface BestAdc {
    name: string;
    winrate: number;
    games: number;
  }
  
  export interface BestAdcsResponse {
    support: string;
    best_supports: BestAdc[];
  }

  export interface Counter {
    name: string;
    winrate: number;
    games: number;
  }
  
  export interface CounterpickData {
    name: string;
    counters: Counter[];
  }