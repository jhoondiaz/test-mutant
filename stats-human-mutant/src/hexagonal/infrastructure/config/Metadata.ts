/* istanbul ignore file */
import { interfaces, METADATA_KEY } from "inversify";

export class Metadata implements interfaces.Metadata {
  public key: string | number | symbol;
  public value: any;

  public constructor(key: string | number | symbol, value: any) {
    this.key = key;
    this.value = value;
  }

  public toString(): string {
    if (this.key === METADATA_KEY.NAME_TAG) {
      return `named: ${this.value.toString()} `;
    } else {
      return `tagged: { key:${this.key.toString()}, value: ${this.value} }`;
    }
  }
}
