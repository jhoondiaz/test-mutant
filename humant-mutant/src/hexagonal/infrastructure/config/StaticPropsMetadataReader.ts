/* istanbul ignore file */
import { interfaces, METADATA_KEY } from "inversify";
import { FunctionWithMetadata } from "./FunctionWithMetadata";
import { PropertyInjectionMetadata } from "./PropertyInjectionMetadata";
import { Metadata } from "./Metadata";

export class StaticPropsMetadataReader implements interfaces.MetadataReader {
  public getConstructorMetadata(
    constructorFunc: FunctionWithMetadata
  ): interfaces.ConstructorMetadata {
    const formatMetadata = (
      injections: interfaces.ServiceIdentifier<any>[]
    ) => {
      const userGeneratedMetadata: interfaces.MetadataMap = {};
      injections.forEach((injection, index) => {
        const metadata = new Metadata(METADATA_KEY.INJECT_TAG, injection);
        if (Array.isArray(userGeneratedMetadata[index])) {
          userGeneratedMetadata[index].push(metadata);
        } else {
          userGeneratedMetadata[index] = [metadata];
        }
      });
      return userGeneratedMetadata;
    };

    const constructorInjections = constructorFunc.constructorInjections;

    if (!Array.isArray(constructorInjections)) {
      throw new Error("Missing constructorInjections annotation!");
    }

    const userGeneratedConsturctorMetadata = formatMetadata(
      constructorInjections
    );

    return {
      // compilerGeneratedMetadata lenght must match userGeneratedMetadata
      // we expose compilerGeneratedMetadata because if your custom annotation
      // system is powered by decorators. The TypeScript compiler could generate
      // some metadata when the emitDecoratorMetadata flag is enabled.
      compilerGeneratedMetadata: new Array(constructorInjections.length),
      userGeneratedMetadata: userGeneratedConsturctorMetadata,
    };
  }

  public getPropertiesMetadata(
    constructorFunc: FunctionWithMetadata
  ): interfaces.MetadataMap {
    const formatMetadata = (injections: PropertyInjectionMetadata[]) => {
      const userGeneratedMetadata: interfaces.MetadataMap = {};
      injections.forEach((propInjection) => {
        const metadata = new Metadata(
          METADATA_KEY.INJECT_TAG,
          propInjection.injection
        );
        if (Array.isArray(userGeneratedMetadata[propInjection.propName])) {
          userGeneratedMetadata[propInjection.propName].push(metadata);
        } else {
          userGeneratedMetadata[propInjection.propName] = [metadata];
        }
      });
      return userGeneratedMetadata;
    };

    const propertyInjections = constructorFunc.propertyInjections;

    if (!Array.isArray(propertyInjections)) {
      throw new Error("Missing propertyInjections annotation!");
    }

    const userGeneratedPropertyMetadata = formatMetadata(propertyInjections);
    return userGeneratedPropertyMetadata;
  }
}
