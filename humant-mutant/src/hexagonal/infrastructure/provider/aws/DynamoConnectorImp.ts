import { DynamoConnector } from "../../../domain/port/spi/DynamoConnector";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const AWS = require("aws-sdk");

export class DynamoConnectorImp implements DynamoConnector {
  public static readonly constructorInjections = [];
  public static readonly propertyInjections = [];

  async putItem(data: any): Promise<any> {
    const dynamoConnection = new AWS.DynamoDB.DocumentClient();
    const options = {
      TableName: data.tableName,
      Item: {
        id: data.id,
        timestamp: data.timestamp,
        type: data.type,
      },
    };
    return new Promise((resolve, reject) => {
      dynamoConnection.put(options, (err, data) =>
        err ? reject(err) : resolve(data)
      );
    });
  }
}
