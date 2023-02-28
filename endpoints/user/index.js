const handlers = ({ axios }) => ({
  get: async (req, res) => {
    const { data } = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    res.send(data);
  },
  post: async (req, res) => {
    const { body } = req;
    console.log(req.body);
    const { data } = await axios.post(
      "https://jsonplaceholder.typicode.com/users",
      body
    );
    res.send(data);
  },
  put: async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, body);
    res.sendStatus(200);
  },
  delete: async (req, res) => {
    const { id } = req.params;

    await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
    res.sendStatus(204);
  },
});

module.exports = handlers;
