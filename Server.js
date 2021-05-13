const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const cors = require("cors");
const { initDB, getRandomQuestions } = require("./DB/Models/Question");
app.use(cors());
initDB();

app.use(express.static("website"));
const port = 4000;
app.listen(port, () => {
  console.log(`Server is up and listening on port ${port}`);
});

// Setup Server

//Get all route
app.get("/api/questions/", getData);

async function getData(req, res) {
  const questions = await getRandomQuestions();
  res.send(questions);
  console.log("Sending 5 random questions: \n" + JSON.stringify(questions));
}
