import express from "express";
import cors from "cors";
import fs from "fs";
import { format } from "date-fns";

const app = express();
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);
const PORT = 4000;
const DIRECTORY = "TimeStamp";

//API generation to write file

app.get("/writefile", (req, res) => {
  try {
    let today = format(new Date(), "dd-MM-yyyy-HH-mm-ss");

    const filePath = `${DIRECTORY}/${today}.txt`;
    fs.writeFileSync(filePath, `${today}`, "utf8");

    res.status(201).send({ message: "File Created", filename: `${today}.txt` });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Unable to create file" });
  }
});

//API generation to read all files

app.get("/readfiles", (req, res) => {
  try {
    const files = fs.readdirSync(DIRECTORY);
    const fileContents = files.map((file) => {
      const data = fs.readFileSync(`${DIRECTORY}/${file}`, "utf8");
      return { filename: file, fileContent: data };
    });

    res.status(200).send(fileContents);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Unable to read files" });
  }
});

app.listen(PORT, () => {
  console.log("App is listening on Port :", PORT);
});
