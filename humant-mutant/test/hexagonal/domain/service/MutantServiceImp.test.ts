import { MutantServiceImp } from "../../../../src/hexagonal/domain/service/MutantServiceImp";
import { DynamoConnectorImp } from "../../../../src/hexagonal/infrastructure/provider/aws/DynamoConnectorImp";

const provider = new DynamoConnectorImp();

const service = new MutantServiceImp(provider);
const event = ["TGC", "CAG", "TTT"];
const eventBad = ["CAG", "TTT"];
const eventBad2 = ["TGH", "CAG", "TTT"];

describe("Test service", () => {
  jest.restoreAllMocks();
  jest
    .spyOn(provider, "putItem")
    .mockImplementation(() => Promise.resolve(true));

  test("service OK ", async () => {
    const response = await service.postHumanMutant(event);
    expect(response).toBe(true);
  });

  test("service error NxN", async () => {
    try {
      await service.postHumanMutant(eventBad);
    } catch (error) {
      expect(error).toStrictEqual(
        new Error("El dna provisionado no es correcto")
      );
    }
  });

  test("service error Letters", async () => {
    try {
      await service.postHumanMutant(eventBad2);
    } catch (error) {
      expect(error).toStrictEqual(
        new Error("El dna provisionado no es correcto")
      );
    }
  });
});
