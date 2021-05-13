const mongoose = require("mongoose");
const { QUESTIONS } = require("./Questions");
const URL = "mongodb://localhost/Questions";

function initDB() {
  mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true });

  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:")).once(
    "open",
    () => {
      console.log("Sucessfully connected to DB");
    }
  );
}

const questionSchema = mongoose.Schema({
  question: String,
  answers: [String],
  correctAnswer: String,
});
const QuestionBank = mongoose.model("Question", questionSchema);

QuestionBank.find({})
  .exec()
  .then((res) => {
    if (res.length === 0) {
      QuestionBank.insertMany(QUESTIONS);
    }
  })
  .catch((err) => console.log(err));

async function getRandomQuestions(size = 5) {
  try {
    return QuestionBank.aggregate([{ $sample: { size } }]).exec();
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  initDB,
  getRandomQuestions,
};
