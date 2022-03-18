export interface DynamoConnector {
  getInfoTable(options: any): Promise<any>;
}
