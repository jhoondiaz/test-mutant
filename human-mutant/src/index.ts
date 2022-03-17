/* eslint-disable @typescript-eslint/no-explicit-any */
import "reflect-metadata";
import { CONTROLLERS } from "./hexagonal/infrastructure/config/Types";
import { AppContainer } from "./hexagonal/infrastructure/config/inversify.config";
import { MutantController } from "./hexagonal/application/controller/MutantController";
import { CODES, HEADERS } from "./utils/Constants";

let controller: MutantController;

export const handler = async (event: any): Promise<any> => {
  try {
    event = await mapInput(event);

    controller = AppContainer.get<MutantController>(
      CONTROLLERS.MutantController
    );

    console.log("event: ", event);
    const response = await controller.maindistributor(event);

    console.log("Response: ", response);
    return response;
  } catch (error) {
    const response = {
      statusCode: CODES.codeError,
      headers: HEADERS,
      body: JSON.stringify(error.message),
      isBase64Encoded: false,
    };
    return response;
  }
};

const mapInput = async (event) => {
  const body = JSON.parse(event.body);
  const eventFinal = {
    path: event.path,
    httpMethod: event.httpMethod,
    dna: body ? body.dna : null,
  };
  return eventFinal;
};
