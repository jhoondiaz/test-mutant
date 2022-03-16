export interface MutantController {
  postHumanMutant(dna: Array<string>): Promise<any>;
}
