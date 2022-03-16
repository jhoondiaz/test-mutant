import { interfaces } from "inversify";
import { PropertyInjectionMetadata } from "./PropertyInjectionMetadata";

export interface FunctionWithMetadata extends Function {
  constructorInjections: interfaces.ServiceIdentifier<any>[];
  propertyInjections: PropertyInjectionMetadata[];
}
