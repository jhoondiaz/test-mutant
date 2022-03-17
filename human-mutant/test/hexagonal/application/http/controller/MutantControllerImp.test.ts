import { MutantControllerImp } from "../../../../../src/hexagonal/application/controller/http/MutantControllerImp";
import { MutantServiceImp } from "../../../../../src/hexagonal/domain/service/MutantServiceImp";
import { DynamoConnectorImp } from "../../../../../src/hexagonal/infrastructure/provider/aws/DynamoConnectorImp";

const provider = new DynamoConnectorImp();
const service = new MutantServiceImp(provider);
const controller = new MutantControllerImp(service);

const event = {
  path: "/mutants",
  httpMethod: "POST",
  dna: ["TGC", "CAG", "TTT"],
};
const eventBad = ["CAG", "TTT"];

describe("Test Controller", () => {
  test("should create a controller", () => {
    const controller = new MutantControllerImp(service);
    expect(controller._mutantService).toBe(service);
  });

  test("should create a controller", () => {
    expect(controller).toBeDefined();
  });

  test("should OK postHumanMutant", async () => {
    jest.restoreAllMocks();
    jest
      .spyOn(service, "postHumanMutant")
      .mockImplementation(() => Promise.resolve(event));
    const response = await controller.maindistributor(event);
    expect(response).toBe(event);
  });

  test("Should ERROR postHumanMutant", async () => {
    jest.restoreAllMocks();
    jest.spyOn(service, "postHumanMutant").mockImplementation(() => {
      throw new Error("Error");
    });
    try {
      await controller.maindistributor(event);
    } catch (error) {
      expect(error).toEqual(new Error("Error"));
    }
  });

  test("should OK getHumanMutant", async () => {
    jest.restoreAllMocks();
    jest
      .spyOn(service, "getHumanMutant")
      .mockImplementation(() => Promise.resolve(event));
    event.path = "/stats";
    event.httpMethod = "GET";
    const response = await controller.maindistributor(event);
    expect(response).toBe(event);
  });

  test("Should ERROR getHumanMutant", async () => {
    jest.restoreAllMocks();
    jest.spyOn(service, "getHumanMutant").mockImplementation(() => {
      throw new Error("Error");
    });
    try {
      event.path = "/stats";
      event.httpMethod = "GET";
      await controller.maindistributor(event);
    } catch (error) {
      expect(error).toEqual(new Error("Error"));
    }
  });
});
