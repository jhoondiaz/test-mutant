import { MutantServiceImp } from "../../../../src/hexagonal/domain/service/MutantServiceImp";
import { DynamoConnectorImp } from "../../../../src/hexagonal/infrastructure/provider/aws/DynamoConnectorImp";

const provider = new DynamoConnectorImp();

const service = new MutantServiceImp(provider);
const eventMutantVertical = ["TGCAC", "CAGCC", "TTTCA", "CAGCC", "TTTCC"];
const eventMutantHorizontal = ["TGCAC", "CAGCC", "TAAAA", "CAGCC", "TTTCC"];
const eventMutantObliqueLeft = ["TGCAA", "CTGCC", "TTTCA", "CAGTC", "ACACC"];
const eventMutantObliqueRight = ["TGCAC", "CAGTA", "TTTCA", "CTGCC", "TTTCC"];
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
    const response = await service.postHumanMutant(eventMutantVertical);
    expect(response.body).toBe("Mutant");
  });

  test("service OK event Mutant Horizontal", async () => {
    const response = await service.postHumanMutant(eventMutantHorizontal);
    expect(response.body).toBe("Mutant");
  });

  test("service OK event Mutant Oblique Left", async () => {
    const response = await service.postHumanMutant(eventMutantObliqueLeft);
    expect(response.body).toBe("Mutant");
  });

  test("service OK event Mutant Oblique Right", async () => {
    const response = await service.postHumanMutant(eventMutantObliqueRight);
    expect(response.body).toBe("Mutant");
  });

  test("service OK event Human", async () => {
    const response = await service.postHumanMutant(eventHuman);
    expect(response.body).toBe("Human");
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

  test("service error Length", async () => {
    try {
      await service.postHumanMutant(eventBad3);
    } catch (error) {
      expect(error).toStrictEqual(
        new Error("El dna provisionado no es correcto")
      );
    }
  });

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
