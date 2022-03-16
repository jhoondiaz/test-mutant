/* eslint-disable @typescript-eslint/no-explicit-any */
import "reflect-metadata";
import { CONTROLLERS } from "./hexagonal/infrastructure/config/Types";
import { AppContainer } from "./hexagonal/infrastructure/config/inversify.config";
import { MutantController } from "./hexagonal/application/controller/MutantController";

let controller: MutantController;

export const handler = async (event: any): Promise<any> => {
  try {
    console.log(`Initializing Customer Inquiry ${JSON.stringify(event)}`);

    event = await mapInput(event);

    controller = AppContainer.get<MutantController>(
      CONTROLLERS.MutantController
    );

    const customer = await controller.postHumanMutant(event.dna);

    const response = {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
      },
      body: JSON.stringify(customer),
      isBase64Encoded: false,
    };

    console.log("Return", customer);
    return response;
  } catch (error) {
    console.log("Error General index:", error);
    throw JSON.stringify(error);
  }
};

const mapInput = async (event) => {
  const body = JSON.parse(event.body);
  const eventFinal = {
    dna: body.dna,
  };
  return eventFinal;
};
