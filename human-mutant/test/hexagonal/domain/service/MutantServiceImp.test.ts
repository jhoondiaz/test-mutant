import { MutantServiceImp } from "../../../../src/hexagonal/domain/service/MutantServiceImp";
import { DynamoConnectorImp } from "../../../../src/hexagonal/infrastructure/provider/aws/DynamoConnectorImp";

const provider = new DynamoConnectorImp();

const eventMutantVertical = ["TTTTC", "CAGCC", "TTTCC", "CAGCC", "TTTCC"];
const eventMutantHorizontal = ["TGCAC", "TCCCC", "TAAAA", "TAGCC", "TTTCC"];
const eventMutantObliqueLeft = ["TGCAA", "ATGCA", "ATTCC", "AAGTA", "ACACC"];
const eventMutantObliqueRight = ["TGCAC", "TAGTA", "TTTCA", "TTGCC", "TTTCC"];
const eventHuman = ["TGCAC", "CAGTA", "GTTCA", "CAGCC", "GACTT"];
const eventBad = ["CAG", "TTT"];
const eventBad2 = ["TGH", "CAG", "TTT"];
const eventBad3 = ["TGAA", "CAGA", "TTTA", "TTT"];

describe("Test service", () => {
  jest.restoreAllMocks();
  jest
    .spyOn(provider, "putItem")
    .mockImplementation(() => Promise.resolve(true));
  jest
    .spyOn(provider, "getInfoTable")
    .mockImplementation(() =>
      Promise.resolve({ Items: [{ type: "Human" }], Count: 0 })
    );

  test("service OK event Mutant Vertical", async () => {
    const service = new MutantServiceImp(provider);
    const response = await service.postHumanMutant(eventMutantVertical);
    expect(response.body).toBe("Mutant");
  });

  test("service OK event Mutant Oblique Left", async () => {
    const service = new MutantServiceImp(provider);
    const response = await service.postHumanMutant(eventMutantObliqueLeft);
    expect(response.body).toBe("Mutant");
  });

  test("service OK event Mutant Oblique Right", async () => {
    const service = new MutantServiceImp(provider);
    const response = await service.postHumanMutant(eventMutantObliqueRight);
    expect(response.body).toBe("Mutant");
  });

  test("service OK event Human", async () => {
    const service = new MutantServiceImp(provider);
    const response = await service.postHumanMutant(eventHuman);
    expect(response.body).toBe("Human");
  });

  test("service error NxN", async () => {
    try {
      const service = new MutantServiceImp(provider);
      await service.postHumanMutant(eventBad);
    } catch (error) {
      expect(error).toStrictEqual(
        new Error("El dna provisionado no es correcto")
      );
    }
  });

  test("service error Letters", async () => {
    try {
      const service = new MutantServiceImp(provider);
      await service.postHumanMutant(eventBad2);
    } catch (error) {
      expect(error).toStrictEqual(
        new Error("El dna provisionado no es correcto")
      );
    }
  });

  test("service error Length", async () => {
    try {
      const service = new MutantServiceImp(provider);
      await service.postHumanMutant(eventBad3);
    } catch (error) {
      expect(error).toStrictEqual(
        new Error("El dna provisionado no es correcto")
      );
    }
  });
});
