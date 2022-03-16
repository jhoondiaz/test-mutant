export interface DynamoConnector {
  putItem(data: any): Promise<any>;
}
