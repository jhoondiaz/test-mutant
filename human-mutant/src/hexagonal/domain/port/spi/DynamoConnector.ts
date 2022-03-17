export interface DynamoConnector {
  putItem(data: any): Promise<any>;
  getInfoTable(options: any): Promise<any>;
}
