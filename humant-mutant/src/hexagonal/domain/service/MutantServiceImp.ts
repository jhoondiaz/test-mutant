/* eslint-disable @typescript-eslint/no-explicit-any */
import { MutantService } from "../port/api/MutantService";
import { DynamoConnector } from "../port/spi/DynamoConnector";
import { v4 as uuidv4 } from "uuid";

export class MutantServiceImp implements MutantService {
  public static readonly constructorInjections = ["DynamoConnector"];
  public static readonly propertyInjections = [];

  public _dynamoConnector: DynamoConnector;

  constructor(dynamoConnector: DynamoConnector) {
    this._dynamoConnector = dynamoConnector;
  }

  async postHumanMutant(dna: Array<string>): Promise<any> {
    try {
      if (!this.validation(dna)) {
        throw new Error("El dna provisionado no es correcto");
      }

      const data = {
        tableName: process.env.DYNAMO_TABLE,
        id: uuidv4(),
        timestamp: 1212,
        type: this.classificHumanMutant(dna),
      };

      return await this._dynamoConnector.putItem(data);
    } catch (error) {
      console.log(`General Error ${error.message}`, error);
      throw error;
    }
  }

  classificHumanMutant = (dna: Array<string>): string => {
    return "mutant";
  };

  validation = (dna: Array<string>): boolean => {
    const dnalength: number = dna.length;
    const letters: Array<string> = ["T", "A", "C", "G"];
    for (let i = 0; i < dna.length; i++) {
      const element: Array<string> = dna[i].split("");
      if (element.length != dnalength) {
        return false;
      }
      for (let j = 0; j < element.length; j++) {
        const element2: string = element[j];
        if (!letters.includes(element2)) {
          return false;
        }
      }
    }
    return true;
  };
}
