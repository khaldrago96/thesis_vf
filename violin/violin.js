// DRAW NOTES
document.getElementById("buttongr").style.visibility = "hidden";
document.getElementById("endbtn").style.visibility = "hidden";

/* FUNCTIONALITY LOGICS
 *  below are the functions that are required to:
 *   1. get a random number for question
 *   2. algorithm for change the solution sequence
 *   3. start the quiz will be triggered by a button.
 * stove, questions and buttons will be shown after the button was clicked
 */
let helper;
let rightAnswer = 0;
let totalQuestion = 0;

function randomQuestion() {
  getRandomNumber(randomNumber);
  showNote(randomNumber);
}

function getRandomNumber(questionNr) {
  buttonRandomController = questionArray[questionNr - 1].l;
  while (buttonRandomController.length !== 4) {
    let x = Math.floor(Math.random() * 4);
    if (
      !buttonRandomController.includes(x) ||
      buttonRandomController.length === 0
    )
      buttonRandomController.push(x);
  }
  for (let i = 1; i < buttonRandomController.length + 1; i++) {
    document.getElementById("b" + i).innerHTML = buttonRandomController[i - 1];
  }
  delete buttonRandomController;
}
function startEasyScore() {
  document.getElementById("buttongr").style.visibility = "visible";
  document.getElementById("endbtn").style.visibility = "visible";
  document.getElementById("startbtn").style.display = "none";
  document.getElementById("boo").innerHTML = "";

  document.getElementById("nextbtn").disabled = true;
  document.getElementById("hint").innerHTML = "";
  let randomNumber = Math.floor(Math.random() * questionArray.length + 1);
  console.log("randomNumber :", randomNumber);
  getRandomNumber(randomNumber);

  var vf = new Vex.Flow.Factory({ renderer: { elementId: "boo" } });
  var score = vf.EasyScore();
  var system = vf.System();
  system
    .addStave({
      voices: [
        score.voice(score.notes(questionArray[randomNumber - 1].a + "/" + 1))
      ]
    })
    .addClef("treble");
  vf.draw();
  helper = randomNumber;
  totalQuestion++;
  // console.log("a :", helper);
  movebar();
}

function movebar() {
  var elem = document.getElementById("bar");
  // var width = totalQuestion;

  elem.style.width = totalQuestion * 10 + "%";
  elem.innerHTML = totalQuestion * 10 + "%";
}

function checkAnswer(button) {
  document.getElementById("nextbtn").disabled = false;
  console.log(helper);
  //   console.log(id.innerHTML);
  console.log(button);
  let x = questionArray[helper - 1].a;
  console.log("x :", x.charAt(0));
  if (button.innerHTML + "4" === x) {
    rightAnswer++;

    document.getElementById("hint").style.color = "green";
    document.getElementById("hint").innerHTML = "Right Answer!";
  } else {
    // document.getElementById(button.id.toString()).style.backgroundColor = "red";

    document.getElementById("hint").style.color = "red";
    document.getElementById("hint").innerHTML = "Right answer: " + x.charAt(0);
  }
  console.log("rightAnswer :", rightAnswer);
  console.log("totalQuestion: ", totalQuestion);
  // startEasyScore();
}

function endSession() {
  console.log("object");
  document.getElementById("cont").style.display = "none";
}
const questionArray = [
  { a: "C4", l: ["C", "D", "A", "E"] },
  { a: "D4", l: ["F", "D", "G", "B"] },
  { a: "G4", l: ["G", "D", "E", "F"] },
  { a: "B4", l: ["F", "A", "B", "E"] },
  { a: "A4", l: ["C", "A", "E", "B"] },
  { a: "C4", l: ["E", "B", "C", "G"] },
  { a: "F4", l: ["D", "G", "F", "E"] },
  { a: "E4", l: ["E", "C", "A", "D"] }
];
