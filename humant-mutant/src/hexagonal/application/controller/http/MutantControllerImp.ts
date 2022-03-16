import { MutantService } from "../../../domain/port/api/MutantService";
import { MutantController } from "../MutantController";

export class MutantControllerImp implements MutantController {
  public static readonly constructorInjections = ["MutantService"];
  public static readonly propertyInjections = [];

  public _mutantService: MutantService;

  constructor(mutantService: MutantService) {
    this._mutantService = mutantService;
  }

  public async postHumanMutant(dna: Array<string>): Promise<any> {
    try {
      console.log("postHumanMutant");
      return await this._mutantService.postHumanMutant(dna);
    } catch (error) {
      console.log(`Controller - General Error: ${error.message}`, error);
      throw error;
    }
  }
}
