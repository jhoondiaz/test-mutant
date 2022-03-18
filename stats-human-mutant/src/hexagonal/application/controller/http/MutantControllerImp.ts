import { MutantService } from "../../../domain/port/api/MutantService";
import { MutantController } from "../MutantController";

export class MutantControllerImp implements MutantController {
  public static readonly constructorInjections = ["MutantService"];
  public static readonly propertyInjections = [];

  public _mutantService: MutantService;

  constructor(mutantService: MutantService) {
    this._mutantService = mutantService;
  }

  public async maindistributor(): Promise<any> {
    try {
      return await this._mutantService.getHumanMutant();
    } catch (error) {
      console.log(`Controller - General Error: ${error.message}`, error);
      throw error;
    }
  }
}
