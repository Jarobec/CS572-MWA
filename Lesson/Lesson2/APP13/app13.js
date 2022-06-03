const http = require("http");
const fs = require("fs");

let indexFileContents = "File Not Read Yet";

fs.readFile(__dirname + "\\public\\index.html", function (err, buffer) {
  indexFileContents = buffer;
});

const serveIndexFile = function (req, res) {
  res.writeHead("Content-Type", "text/html");
  res.writeHead(200);
  res.end(indexFileContents);
};

const helloWorld = function (req, res) {
  res.writeHead("Content-Type", "application/json");
  res.writeHead(200);
  res.end("{}");
};

const myRouter = function (req, res) {
  const url = req.url;
  switch (url) {
    case "/hello":
      helloWorld(res, req);
      break;
    case "/file":
      serveIndexFile(res, req);
      break;
  }
};

const server = http.createServer(myRouter);

server.listen(8080, "localhost", function () {
  console.log("Server is running on port 8080");
});
