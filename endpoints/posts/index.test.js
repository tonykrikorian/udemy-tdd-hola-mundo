//Pruebas de integración
//Debemos pasar la instancia de la aplicación de express a superTest
const request = require("supertest");
const app = require("../../server");

describe("Server", () => {
  describe("endpoints", () => {
    describe("post POST", () => {
      it("create a new post", async () => {
        const response = await request(app)
          .post("/")
          .send({ userId: 5 })
          .set("user_id", 1)
          .set("Content-Type", "application/json");

        expect(response.statusCode).toEqual(201);
        expect(response.body.userId).toEqual(5);
        expect(response.body).toHaveProperty("id");
      });
    });
  });
});
