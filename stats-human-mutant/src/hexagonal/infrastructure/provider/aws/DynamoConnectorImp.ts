import { DynamoConnector } from "../../../domain/port/spi/DynamoConnector";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const AWS = require("aws-sdk");

export class DynamoConnectorImp implements DynamoConnector {
  public static readonly constructorInjections = [];
  public static readonly propertyInjections = [];

  async getInfoTable(options: any): Promise<any> {
    const dynamoConnection = new AWS.DynamoDB.DocumentClient();
    return new Promise((resolve, reject) => {
      dynamoConnection.query(options, (err, data) =>
        err ? reject(err) : resolve(data)
      );
    });
  }
}
