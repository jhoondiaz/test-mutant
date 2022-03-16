import { MutantControllerImp } from "../../../../../src/hexagonal/application/controller/http/MutantControllerImp";
import { MutantServiceImp } from "../../../../../src/hexagonal/domain/service/MutantServiceImp";
import { DynamoConnectorImp } from "../../../../../src/hexagonal/infrastructure/provider/aws/DynamoConnectorImp";

const provider = new DynamoConnectorImp();
const service = new MutantServiceImp(provider);
const controller = new MutantControllerImp(service);

const event = ["TGC", "CAG", "TTT"];
const eventBad = ["CAG", "TTT"];

describe("Test Controller", () => {
  test("should create a controller", () => {
    const controller = new MutantControllerImp(service);
    expect(controller._mutantService).toBe(service);
  });

  test("should create a controller", () => {
    expect(controller).toBeDefined();
  });

  test("should OK", async () => {
    jest.restoreAllMocks();
    jest
      .spyOn(service, "postHumanMutant")
      .mockImplementation(() => Promise.resolve(event));
    const response = await controller.postHumanMutant(event);
    expect(response).toBe(event);
  });

  test("Should ERROR", async () => {
    jest.restoreAllMocks();
    jest.spyOn(service, "postHumanMutant").mockImplementation(() => {
      throw new Error("Error");
    });
    try {
      await controller.postHumanMutant(eventBad);
    } catch (error) {
      expect(error).toEqual(new Error("Error"));
    }
  });
});
