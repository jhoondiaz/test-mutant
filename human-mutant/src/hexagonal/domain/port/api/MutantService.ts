export interface MutantService {
  postHumanMutant(data: Array<string>): Promise<any>;
  getHumanMutant(): Promise<any>;
}
