describe("Prueba", () => {
  describe("Suma", () => {
    it("Suma 2 numeros", () => {
      const suma = (a, b) => {
        return a + b;
      };

      expect(suma(4, 2)).toEqual(6);
    });
  });
});

//yarn test --watchAll: para correr los test en modo watch
