const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

const fs = require('fs')

app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const dataPath = "./src/symbols.json"

app.post("/", (req, res) => {
    return res.send("Received a POST HTTP method");
});

app.put("/", (req, res) => {
    return res.send("Received a PUT HTTP method");
});

app.delete("/", (req, res) => {
    return res.send("Received a DELETE HTTP method");
});

app.get("/symbol", (req, res) => {
    fs.readFile(dataPath, "utf8", (err, data) => {
        if (err) {
            throw err
        }

        res.send(JSON.parse(data))
    });
});

app.delete('/symbol', (req, res) => {
    fs.readFile(dataPath, "utf8", (err, data) => {
        if (err) {
            throw err
        }
        console.log(req.query.id)
        const dataOutput = JSON.parse(data).filter(item=>item.id!=req.query?.id)
        fs.writeFile(dataPath, JSON.stringify(dataOutput), 'utf8', err => {
            if (err) {
              throw err;
            }
          });
        res.status(200).send(dataOutput)
    },true);
  });

app.listen(8081, () =>
    console.log(`Example app listening on port 8081!`)
);
