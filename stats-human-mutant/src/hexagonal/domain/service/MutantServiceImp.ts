/* eslint-disable @typescript-eslint/no-explicit-any */
import { MutantService } from "../port/api/MutantService";
import { DynamoConnector } from "../port/spi/DynamoConnector";
import { HEADERS } from "../../../utils/Constants";

export class MutantServiceImp implements MutantService {
  public static readonly constructorInjections = ["DynamoConnector"];
  public static readonly propertyInjections = [];

  public _dynamoConnector: DynamoConnector;
  private dnaFinal: Array<Array<string>> = [];

  constructor(dynamoConnector: DynamoConnector) {
    this._dynamoConnector = dynamoConnector;
  }

  async getHumanMutant(): Promise<any> {
    try {
      const optionsGet = {
        TableName: process.env.DYNAMO_TABLE,
        IndexName: "type-index",
        KeyConditionExpression: "#sts = :sts",
        ExpressionAttributeNames: {
          "#sts": "type",
        },
        ExpressionAttributeValues: {
          ":sts": "Human",
        },
      };

      const itemsHuman = await this._dynamoConnector.getInfoTable(optionsGet);

      optionsGet.ExpressionAttributeValues[":sts"] = "Mutant";

      const itemsMutants = await this._dynamoConnector.getInfoTable(optionsGet);

      const countMutants = itemsMutants.Count;
      const countHuman = itemsHuman.Count;
      const ratio = countMutants / countHuman;

      if (countHuman == 0 && countMutants == 0) {
        throw new Error(`Actualmente la base de datos se encuentra vacia`);
      }

      const body = {
        count_mutant_dna: countMutants,
        count_human_dna: countHuman,
        ratio: ratio,
      };

      const response = {
        statusCode: 200,
        headers: HEADERS,
        body: JSON.stringify(body),
        isBase64Encoded: false,
      };

      return response;
    } catch (error) {
      console.log(`General Error ${error.message}`, error);
      throw error;
    }
  }
}
