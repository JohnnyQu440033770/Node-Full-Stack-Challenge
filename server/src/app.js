const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

const fs = require("fs");

app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const dataPath = "./src/symbols.json";

app.get("/symbol", (req, res) => {
  fs.readFile(dataPath, "utf8", (err, data) => {
    if (err) {
      throw err;
    }

    res.send(JSON.parse(data));
  });
});

app.delete("/symbol", (req, res) => {
  fs.readFile(
    dataPath,
    "utf8",
    (err, data) => {
      if (err) {
        throw err;
      }
      const dataOutput = JSON.parse(data).filter(
        (item) => item.id != req.query?.id
      );
      fs.writeFile(dataPath, JSON.stringify(dataOutput), "utf8", (err) => {
        if (err) {
          throw err;
        }
      });
      res.status(200).send(dataOutput);
    },
    true
  );
});

app.post("/symbol", (req, res) => {
  fs.readFile(
    dataPath,
    "utf8",
    (err, data) => {
      if (err) {
        throw err;
      }
      const dataOutput = [...JSON.parse(data), req.body];
      fs.writeFile(dataPath, JSON.stringify(dataOutput), "utf8", (err) => {
        if (err) {
          throw err;
        }
      });
      res.status(200).send(dataOutput);
    },
    true
  );
});

app.put("/symbol", (req, res) => {
    fs.readFile(
        dataPath,
        "utf8",
        (err, data) => {
          if (err) {
            throw err;
          }
          const dataOutput = JSON.parse(data).map(obj => req.body.id === obj.id? req.body : obj)
          fs.writeFile(dataPath, JSON.stringify(dataOutput), "utf8", (err) => {
            if (err) {
              throw err;
            }
          });
          res.status(200).send(dataOutput);
        },
        true
      );
});

app.listen(8081, () => console.log(`Example app listening on port 8081!`));
