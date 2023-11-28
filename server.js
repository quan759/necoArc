const express = require("express");

const server = express();

server.all("/", (req, res) => {
  res.send(`<!DOCTYPE html>
    <html>
    <head>
      <title>Ảnh động</title>
    </head>
    <body>
      <h1>Ảnh động</h1>
      <img src="https://images-ext-1.discordapp.net/external/b9b4zDmqdnRYqhKSwthknxYGMEyJSGDTYYhXBECeTyU/https/media.tenor.com/L8C9UdyN6OIAAAPo/spin-spinning.mp4" alt="Ảnh">
    </body>
    </html>`);
});

function keepAlive() {
  server.listen(3000, () => {
    console.log("Server is ready.");
  });
}

module.exports = keepAlive;