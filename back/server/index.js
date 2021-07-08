const fs = require("fs");
const path = require("path");
const express = require("express");
const fileUpload = require("express-fileupload");
const {spawn} = require('child_process');

const app = express();
const port = 3000;
const folder = "./uploads/";
const allowedTypes = {
  "image/png": "png",
  "image/jpeg": "jpeg"
};

app.use(fileUpload({
  useTempFiles: true,
  safeFileNames: true,
  createParentPath: true,
  limits: { fileSize: 50 * 1024 * 1024 },
  abortOnLimit: true,
  limitHandler: (req, res) => res.status(413).json({ error: "above_limit" })
}));

app.post("/upload", (req, res) => {
  const file = req.files.image;

  if (file === undefined) {
    res.status(400).json({ error: "missing_file" });
    return;
  }

  var extension = allowedTypes[file.mimetype];
  if (extension === undefined) {
    res.status(403).json({ error: "invalid_type" });
    return;
  }

  file.mv(path.join(folder, `${req.body.filename}.${extension}`)).then(() => {
    const pythonProcess = spawn('python3',["../model/testing.py", `./uploads/${req.body.filename}`]);
    var imageResult = [];
    pythonProcess.stdout.on('data', function (data) {
      console.log('Pipe data from python script ...');
      imageResult.push(data);
    });
    pythonProcess.on('close', (code) => {
      console.log(`child process close all stdio with code ${code}`);
      res.send(imageResult.join(""))
    });
  }).catch(error => {
    console.error(error);
    res.status(500).json({ error: "failed" });
  });
});

app.listen(port);
