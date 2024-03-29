const exp = require("constants");
const handlers = require("./index");

describe("Endpoints", () => {
  describe("users", () => {
    describe("get", () => {
      it("returns users json", async () => {
        //Para construir un mock de jest hacemos
        //Hacemos un mock del handler para el metodo get y que devuelva el objeto {data:1}
        const axios = {
          get: jest.fn().mockResolvedValue({ data: { name: "Tony" } }),
        };

        //Debemos llamar handlers, inyectamos axios, este recibe los objetos req, res, debemos construir mocks para ellos

        const res = {
          status: jest.fn().mockReturnThis(),
          send: jest.fn(),
        };

        //Estas llamadas a xios son asincronas, hay que esperarlas
        await handlers({ axios }).get({}, res);

        //Para ver con que valores se llama una funcion hacemos
        //console.log(res.status.mock.calls);

        expect(res.status.mock.calls).toEqual([[200]]);

        //console.log(res.send.mock.calls);
        expect(res.send.mock.calls).toEqual([[{ name: "Tony" }]]);
      });
    });
    describe("post", () => {
      it("Creates a resource", async () => {
        const axios = {
          post: jest.fn().mockResolvedValue({ data: 1 }),
        };

        const res = {
          status: jest.fn().mockReturnThis(),
          send: jest.fn(),
        };

        const req = {
          body: "request body",
        };

        await handlers({ axios }).post(req, res);

        expect(res.status.mock.calls).toEqual([[201]]);
        expect(res.send.mock.calls).toEqual([[1]]);
        expect(axios.post.mock.calls).toEqual([
          ["https://jsonplaceholder.typicode.com/users", "request body"],
        ]);
      });
    });

    describe("put", () => {
      it("Test update and user", async () => {
        const req = {
          body: "request body",
          params: {
            id: 12,
          },
        };

        const res = {
          sendStatus: jest.fn(),
        };

        const axios = {
          put: jest.fn().mockResolvedValue({ data: 1 }),
        };

        await handlers({ axios }).put(req, res);
        expect(axios.put.mock.calls).toEqual([
          ["https://jsonplaceholder.typicode.com/users/12", "request body"],
        ]);
      });
    });
    describe("delete", () => {
      it("delete a resource", async () => {
        const req = {
          params: {
            id: 15,
          },
        };

        const res = {
          sendStatus: jest.fn(),
        };

        const axios = {
          delete: jest.fn().mockResolvedValue({ data: 1 }),
        };

        await handlers({ axios }).delete(req, res);
        expect(res.sendStatus.mock.calls).toEqual([[204]]);
        expect(axios.delete.mock.calls).toEqual([
          ["https://jsonplaceholder.typicode.com/users/15"],
        ]);
      });
    });
  });
});
