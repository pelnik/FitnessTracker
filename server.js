const http = require("http")
const app = require("./app")

const { PORT = 3000 } = process.env;
const server = http.createServer(app)

server.listen(PORT, () => {
  console.log("The server is up on port", PORT);
});


