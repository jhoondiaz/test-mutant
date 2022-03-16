import { MutantControllerImp } from "../src/hexagonal/application/controller/http/MutantControllerImp";

const index = require("../src/index");

describe("Suite index", () => {
  test("event handler error validation", async () => {
    jest.restoreAllMocks();
    const event = { body: JSON.stringify({ dna: ["CAG", "TTT"] }) };
    jest
      .spyOn(MutantControllerImp.prototype as any, "postHumanMutant")
      .mockImplementation(() => {
        throw new Error("Error");
      });
    try {
      await index.handler(event);
    } catch (error) {
      expect(error).toStrictEqual(JSON.stringify(new Error("Error")));
    }
  });

  test("event handler validation", async () => {
    jest.restoreAllMocks();
    const event = { body: JSON.stringify({ dna: ["CAG", "TTT"] }) };
    jest
      .spyOn(MutantControllerImp.prototype as any, "postHumanMutant")
      .mockImplementation(() => Promise.resolve(event));

    const resp = await index.handler(event);
    expect(resp.statusCode).toStrictEqual(200);
  });
});
