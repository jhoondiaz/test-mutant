import { MutantControllerImp } from "../../../../../src/hexagonal/application/controller/http/MutantControllerImp";
import { MutantServiceImp } from "../../../../../src/hexagonal/domain/service/MutantServiceImp";
import { DynamoConnectorImp } from "../../../../../src/hexagonal/infrastructure/provider/aws/DynamoConnectorImp";

const provider = new DynamoConnectorImp();
const service = new MutantServiceImp(provider);
const controller = new MutantControllerImp(service);

describe("Test Controller", () => {
  test("should create a controller", () => {
    const controller = new MutantControllerImp(service);
    expect(controller._mutantService).toBe(service);
  });

  test("should create a controller", () => {
    expect(controller).toBeDefined();
  });

  test("should OK getHumanMutant", async () => {
    jest.restoreAllMocks();
    jest
      .spyOn(service, "getHumanMutant")
      .mockImplementation(() => Promise.resolve(true));
    const response = await controller.maindistributor();
    expect(response).toBe(true);
  });

  test("Should ERROR getHumanMutant", async () => {
    jest.restoreAllMocks();
    jest.spyOn(service, "getHumanMutant").mockImplementation(() => {
      throw new Error("Error");
    });
    try {
      await controller.maindistributor();
    } catch (error) {
      expect(error).toEqual(new Error("Error"));
    }
  });
});
