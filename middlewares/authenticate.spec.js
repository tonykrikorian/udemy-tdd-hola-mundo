const authenticate = require("./authenticate");

describe("middlewares", () => {
  describe("authenticate", () => {
    it("Should have id 1", () => {
      const req = {
        headers: jest.fn().mockReturnValue(1),
      };
      const res = {
        sendStatus: jest.fn(),
      };
      const next = jest.fn();
      authenticate(req, res, next);

      expect(req.headers.mock.calls).toEqual([["user_id"]]);
      expect(res.sendStatus.mock.calls).toEqual([]);
      expect(next.mock.calls).toEqual([[]]);
    });

    it("It should fail if user is not 1", () => {
      const req = {
        headers: jest.fn().mockReturnValue(2),
      };
      const res = {
        sendStatus: jest.fn(),
      };
      const next = jest.fn();
      authenticate(req, res, next);

      expect(req.headers.mock.calls).toEqual([["user_id"]]);
      expect(res.sendStatus.mock.calls).toEqual([[403]]);
      expect(next.mock.calls).toEqual([]);
    });
  });
});
