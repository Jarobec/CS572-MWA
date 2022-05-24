const http = require("http");
const fs = require("fs");
path = require("path");

let fileBuffer = "File not read yet";
let statusCode;

const serveFile = function (req, res, fileUrl) {
  res.setHeader("Content-Type", "text/html");
  fs.readFile(path.join(__dirname, fileUrl), function (err, buffer) {
    if (err) {
      fileBuffer = "<h3>File not found</h3>";
      statusCode = 404;
    } else {
      fileBuffer = buffer;
      statusCode = 200;
    }

    res.writeHead(statusCode);
    res.end(fileBuffer);
  });
};

const serveJson = function (req, res) {
  const jsonResponse = {
    response: "Successfully",
    text: "This is a JSON",
    method: "POST",
    url: "/",
  };
  res.setHeader("Content-Type", "application/json");
  res.writeHead(200);
  res.end(JSON.stringify(jsonResponse));
};

const myRouter = function (req, res) {
  const url = req.url;
  const method = req.method;

  switch (method) {
    case "GET":
      switch (url) {
        case "/index":
          serveFile(req, res, "../public/index.html");
          break;
        case "/page1":
          serveFile(req, res, "../public/page1.html");
          break;
        case "/page2":
          serveFile(req, res, "../public/page2.html");
          break;
        default:
          serveFile(req, res, "../public/index.html");
          break;
      }
      break;
    case "POST":
      switch (url) {
        case "/":
          serveJson(req, res);
          break;
      }
  }
};

const server = http.createServer(myRouter);

server.listen(4343, "localhost", function () {
  console.log("Server is running on port 4343");
});
