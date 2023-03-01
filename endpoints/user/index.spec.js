const handlers = require("./index");

describe("Endpoints", () => {
  describe("users", () => {
    describe("get", () => {
      it("return to user json", () => {
        const axios = {
          get: jest.fn().mockResolvedValue({ data: 1 }),
        };
        handlers({ axios });
      });
    });
  });
});
