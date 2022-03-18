import { MutantServiceImp } from "../../../../src/hexagonal/domain/service/MutantServiceImp";
import { DynamoConnectorImp } from "../../../../src/hexagonal/infrastructure/provider/aws/DynamoConnectorImp";

const provider = new DynamoConnectorImp();

const service = new MutantServiceImp(provider);

describe("Test service", () => {
  jest.restoreAllMocks();
  jest
    .spyOn(provider, "getInfoTable")
    .mockImplementation(() =>
      Promise.resolve({ Items: [{ type: "Human" }], Count: 0 })
    );

  test("service OK getHumanMutant", async () => {
    jest.restoreAllMocks();
    jest
      .spyOn(provider, "getInfoTable")
      .mockImplementation(() =>
        Promise.resolve({ Items: [{ type: "Human" }], Count: 1 })
      );
    const response = await service.getHumanMutant();
    expect(response.statusCode).toBe(200);
  });

  test("service error getHumanMutant", async () => {
    jest.restoreAllMocks();
    jest
      .spyOn(provider, "getInfoTable")
      .mockImplementation(() =>
        Promise.resolve({ Items: [{ type: "Human" }], Count: 0 })
      );
    try {
      await service.getHumanMutant();
    } catch (error) {
      expect(error).toStrictEqual(
        new Error("Actualmente la base de datos se encuentra vacia")
      );
    }
  });
});
