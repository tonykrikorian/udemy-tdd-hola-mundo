const exp = require("constants");
const postHandlers = require("./index");

describe("Endpoints", () => {
  describe("posts", () => {
    it("Should create a posts", async () => {
      const mockUsers = [
        {
          id: 1,
        },
        { id: 2 },
      ];
      const post = {
        userId: 1,
        id: 1,
        body: "Cuerpo del post",
        title: "Titulo del post",
      };

      const req = {
        body: post,
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      const axios = {
        get: jest.fn().mockResolvedValue({ data: mockUsers }),
        post: jest.fn().mockResolvedValue({ data: { id: 1000 } }),
      };

      await postHandlers({ axios }).post(req, res);

      expect(res.status.mock.calls).toEqual([[201]]);
      expect(axios.post.mock.calls).toEqual([
        ["https://jsonplaceholder.typicode.com/posts", post],
      ]);

      expect(axios.get.mock.calls).toEqual([
        ["https://jsonplaceholder.typicode.com/users"],
      ]);
      expect(res.send.mock.calls).toEqual([[{ id: 1000 }]]);
    });
  });

  it("Should not create a post", async () => {
    const mockUsers = [
      {
        id: 1,
      },
      { id: 2 },
    ];
    const post = {
      userId: 3,
      id: 1,
      body: "Cuerpo del post",
      title: "Titulo del post",
    };

    const req = {
      body: post,
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      sendStatus: jest.fn(),
    };

    const axios = {
      get: jest.fn().mockResolvedValue({ data: mockUsers }),
      post: jest.fn().mockResolvedValue({ data: { id: 1000 } }),
    };

    await postHandlers({ axios }).post(req, res);
    expect(axios.post.mock.calls).toEqual([]); //Que la función no se halla llamado
    expect(res.sendStatus.mock.calls).toEqual([[500]]);
  });
});
