import { METHODS, PATHS } from "../../../../utils/Constants";
import { MutantService } from "../../../domain/port/api/MutantService";
import { MutantController } from "../MutantController";

export class MutantControllerImp implements MutantController {
  public static readonly constructorInjections = ["MutantService"];
  public static readonly propertyInjections = [];

  public _mutantService: MutantService;

  constructor(mutantService: MutantService) {
    this._mutantService = mutantService;
  }

  public async maindistributor(event: any): Promise<any> {
    try {
      if (event.path == PATHS.pathMutants && event.httpMethod == METHODS.post) {
        return await this.postHumanMutant(event.dna);
      }

      if (event.path == PATHS.pathStats && event.httpMethod == METHODS.get) {
        return await this.getHumanMutant();
      }
    } catch (error) {
      console.log(`Controller - General Error: ${error.message}`, error);
      throw error;
    }
  }

  public async getHumanMutant(): Promise<any> {
    try {
      return await this._mutantService.getHumanMutant();
    } catch (error) {
      console.log(`Controller - General Error: ${error.message}`, error);
      throw error;
    }
  }

  public async postHumanMutant(dna: Array<string>): Promise<any> {
    try {
      return await this._mutantService.postHumanMutant(dna);
    } catch (error) {
      console.log(`Controller - General Error: ${error.message}`, error);
      throw error;
    }
  }
}
