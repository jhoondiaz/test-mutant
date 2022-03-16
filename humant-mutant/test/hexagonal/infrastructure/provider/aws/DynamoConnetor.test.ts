/* eslint-disable @typescript-eslint/no-explicit-any */
import {} from "jest";
import { DynamoConnectorImp } from "../../../../../src/hexagonal/infrastructure/provider/aws/DynamoConnectorImp";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const AWS = require("aws-sdk-mock");

const data = {
  tableName: process.env.DYNAMO_TABLE,
  id: "",
  timestamp: 1212,
  type: "",
};

describe("Suite Gateway Provider", () => {
  const provider = new DynamoConnectorImp();

  test("DynamoConnector getCustomerInfo", async () => {
    AWS.restore("DynamoDB.DocumentClient");
    AWS.mock("DynamoDB.DocumentClient", "put", function (params, callback) {
      callback(null, { Item: "success" });
    });
    const response = await provider.putItem(data);
    expect(response.Item).toBe("success");
  });

  test("DynamoConnector getCustomerInfo ERROR", async () => {
    AWS.restore("DynamoDB.DocumentClient");
    AWS.mock("DynamoDB.DocumentClient", "put", function (params, callback) {
      callback(new Error("Error"), null);
    });

    try {
      await provider.putItem(data);
    } catch (error) {
      expect(error).toStrictEqual(new Error("Error"));
    }
  });
});
