import { interfaces } from "inversify";

export interface PropertyInjectionMetadata {
  propName: string;
  injection: interfaces.ServiceIdentifier<any>;
}
