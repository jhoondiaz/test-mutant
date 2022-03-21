/* eslint-disable @typescript-eslint/no-explicit-any */
import { MutantService } from "../port/api/MutantService";
import { DynamoConnector } from "../port/spi/DynamoConnector";
import { v4 as uuidv4 } from "uuid";
import * as moment from "moment-timezone";
import { CODES, HEADERS, VALIDATIONS } from "../../../utils/Constants";

export class MutantServiceImp implements MutantService {
  public static readonly constructorInjections = ["DynamoConnector"];
  public static readonly propertyInjections = [];

  public _dynamoConnector: DynamoConnector;
  private dnaFinal: Array<Array<string>> = [];
  private posSelected: Array<any> = [];

  constructor(dynamoConnector: DynamoConnector) {
    this._dynamoConnector = dynamoConnector;
  }

  async postHumanMutant(dna: Array<string>): Promise<any> {
    try {
      const optionsGet = {
        TableName: process.env.DYNAMO_TABLE,
        IndexName: "adn-index",
        KeyConditionExpression: "#sts = :sts",
        ExpressionAttributeNames: {
          "#sts": "adn",
        },
        ExpressionAttributeValues: {
          ":sts": JSON.stringify(dna),
        },
      };

      const item = await this._dynamoConnector.getInfoTable(optionsGet);

      if (item.Count > 0) {
        throw new Error(
          `El dna provisionado ya fue procesado, resultado: ${item.Items[0].type}`
        );
      }

      this.dnaFinal = [];

      if (!this.validation(dna)) {
        throw new Error("El dna provisionado no es correcto");
      }

      const timestamp = moment(new Date())
        .tz("America/Bogota")
        .format("YYYYMMDDHHmmssms");

      console.log(this.dnaFinal);

      const type = await this.isMutant(this.dnaFinal);
      const description = type ? "Mutant" : "Human";
      const options = {
        TableName: process.env.DYNAMO_TABLE,
        Item: {
          id: uuidv4(),
          timestamp: Number(timestamp),
          type: description,
          adn: JSON.stringify(dna),
        },
      };

      await this._dynamoConnector.putItem(options);

      const response = {
        statusCode: type ? CODES.codeMutant : CODES.codeHuman,
        headers: HEADERS,
        body: description,
        isBase64Encoded: false,
      };

      return response;
    } catch (error) {
      console.log(`General Error ${error.message}`, error);
      throw error;
    }
  }

  async isMutant(dna: Array<Array<string>>): Promise<boolean> {
    const sequence = VALIDATIONS.sequence;
    let count = 0;
    for (let i = 0; i < dna.length; i++) {
      const element = dna[i];
      for (let j = 0; j < element.length; j++) {
        const letter = element[j];
        const promise = await Promise.all([
          await this.searchVertical(dna, letter, i, j, sequence),
          await this.searchHorizontal(dna, letter, i, j, sequence),
          await this.searchObliqueLeftRight(dna, letter, i, j, sequence),
          await this.searchObliqueRightLeft(dna, letter, i, j, sequence),
        ]);
        count += promise.filter((x) => x == true).length;
        if (count >= 2) {
          return true;
        }
      }
    }
    return false;
  }

  async searchVertical(
    dna: Array<Array<string>>,
    letter: string,
    posi: number,
    posj: number,
    sequence: number
  ): Promise<boolean> {
    const arrPos: Array<any> = [];
    for (let k = 0; k < sequence; k++) {
      if (posi >= dna.length) {
        return false;
      }
      const element = dna[posi][posj];
      const posSelected = this.posSelected.find(
        (x) => x.posi == posi && x.posj == posj
      );
      if (letter != element || posSelected != undefined) {
        return false;
      }
      arrPos.push({
        posi: posi,
        posj: posj,
      });
      posi++;
    }
    this.posSelected = this.posSelected.concat(arrPos);
    return true;
  }

  async searchHorizontal(
    dna: Array<Array<string>>,
    letter: string,
    posi: number,
    posj: number,
    sequence: number
  ): Promise<boolean> {
    const arrPos: Array<any> = [];
    for (let k = 0; k < sequence; k++) {
      if (posj >= dna.length) {
        return false;
      }
      const element = dna[posi][posj];
      const posSelected = this.posSelected.find(
        (x) => x.posi == posi && x.posj == posj
      );
      if (letter != element || posSelected != undefined) {
        return false;
      }
      arrPos.push({
        posi: posi,
        posj: posj,
      });
      posj++;
    }
    this.posSelected = this.posSelected.concat(arrPos);
    return true;
  }

  async searchObliqueLeftRight(
    dna: Array<Array<string>>,
    letter: string,
    posi: number,
    posj: number,
    sequence: number
  ): Promise<boolean> {
    const arrPos: Array<any> = [];
    const dnaTam = dna.length;
    for (let k = 0; k < sequence; k++) {
      if (posi >= dnaTam || posj >= dnaTam) {
        return false;
      }
      const element = dna[posi][posj];
      const posSelected = this.posSelected.find(
        (x) => x.posi == posi && x.posj == posj
      );
      if (letter != element || posSelected != undefined) {
        return false;
      }
      arrPos.push({
        posi: posi,
        posj: posj,
      });
      posi++;
      posj++;
    }
    this.posSelected = this.posSelected.concat(arrPos);
    return true;
  }

  async searchObliqueRightLeft(
    dna: Array<Array<string>>,
    letter: string,
    posi: number,
    posj: number,
    sequence: number
  ): Promise<boolean> {
    const arrPos: Array<any> = [];
    const dnaTam = dna.length;
    for (let k = 0; k < sequence; k++) {
      if (posi < 0 || posj >= dnaTam) {
        return false;
      }
      const element = dna[posi][posj];
      const posSelected = this.posSelected.find(
        (x) => x.posi == posi && x.posj == posj
      );
      if (letter != element || posSelected != undefined) {
        return false;
      }
      arrPos.push({
        posi: posi,
        posj: posj,
      });
      posi--;
      posj++;
    }
    this.posSelected = this.posSelected.concat(arrPos);
    return true;
  }

  validation = (dna: Array<string>): boolean => {
    const dnalength: number = dna.length;
    const letters: Array<string> = VALIDATIONS.letters;

    if (dnalength < VALIDATIONS.sequence) {
      return false;
    }

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
      this.dnaFinal.push(element);
    }
    return true;
  };
}
