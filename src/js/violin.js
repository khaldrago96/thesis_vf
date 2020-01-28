/* Testing BuzzJS */
// var mySound = new buzz.sound("assets/audio/audio/piano/040-c.wav");
let audioFiles = [
  "assets/audio/piano/040-c.wav",
  "assets/audio/piano/042-d.wav",
  "assets/audio/piano/044-e.wav",
  "assets/audio/piano/045-f.wav",
  "assets/audio/piano/047-g.wav",
  "assets/audio/piano/049-a.wav",
  "assets/audio/piano/051-b.wav",
  "assets/audio/piano/052-c2.wav",
  "assets/audio/piano/041-cx.wav",
  "assets/audio/piano/043-dx.wav",
  "assets/audio/piano/046-fx.wav",
  "assets/audio/piano/048-gx.wav",
  "assets/audio/piano/050-ax.wav"
];
let pianoBuzz = document.getElementById("piano");
let helper;
let rightAnswer = 0;
let totalQuestion = 0;

pianoBuzz.addEventListener("mousedown", e => {
  if (e.target.dataset.note !== "100") {
    let playSound = new buzz.sound(audioFiles[e.target.dataset.note]);
    playSound.play();
  }
});

function startEasyScore() {
  let randomNumber = Math.floor(Math.random() * questionArray.length + 1);
  console.log("randomNumber :", randomNumber);
  getRandomNumber(randomNumber);

  var vf = new Vex.Flow.Factory({
    renderer: {
      elementId: "boo"
    }
  });
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

  movebar();
  totalQuestion++;
}

// App Interval Identification
// unison = 0,major second = 1, minor second = 2,
/*
 0. Unison C - 0
 1. Major E F - 2
 2. Major A# B - 2
 3. Minor D D# - 1
 4. Unison E - 0
 5. Major B C5 - 2
 6. Minor G G# - 1

 option a b c
*/

//exercises: index of audioFiles
let intervalAppDb = [
  { s: "unison", q: [0, 0], startKey: "C" },
  { s: "major", q: [2, 3], startKey: "E" },
  { s: "major", q: [7, 12], startKey: "A#" },
  { s: "minor", q: [9, 1], startKey: "D" },
  { s: "unison", q: [2, 2], startKey: "E" },
  { s: "major", q: [7, 6], startKey: "B" },
  { s: "minor", q: [4, 11], startKey: "G" }
];

var intervalAppIndex = 0;
var trueAnswer = 0;

function createQuestion() {
  let indexToPlay = intervalAppDb[intervalAppIndex];
  let x = new buzz.sound(audioFiles[indexToPlay.q[0]]);
  let y = new buzz.sound(audioFiles[indexToPlay.q[1]]);
  document.getElementById("hint").innerHTML =
    "First key to be played: " + indexToPlay.startKey;
  x.play();
  setTimeout(() => {
    y.play();
  }, 600);
}

let indicator = document.getElementById("indicator");
function checkIntervalAppAnswer(clickedBtn) {
  let answer = intervalAppDb[intervalAppIndex].s;
  let correctInput = document.getElementById(clickedBtn.id);
  if (clickedBtn.id === answer) {
    trueAnswer++;
    indicator.style.color = "green";
    indicator.innerHTML = "Correct!";
    correctInput.classList.add("btn-success");
    correctInput.classList.remove("btn-info");
    new buzz.sound("./assets/audio/right-answer.mp3").play();
  } else {
    indicator.style.color = "red";
    indicator.innerHTML = "Wrong!";
    correctInput.classList.add("btn-danger");
    document.getElementById(answer).classList.remove("btn-info");
    document.getElementById(answer).classList.add("btn-success");
    new buzz.sound("./assets/audio/wrong-answer.mp3").play();
  }
}

function nextQ() {
  let items = document.querySelectorAll(".a");
  indicator.innerHTML = "";
  for (let i = 0; i < items.length; i++) {
    items[i].classList.remove("btn-success", "btn-danger");
    items[i].classList.add("btn-info");
  }
  intervalAppIndex.length === intervalAppDb.length
    ? (intervalAppIndex = intervalAppDb.length - 1)
    : intervalAppIndex++;
  setTimeout(() => {
    createQuestion();
  }, 500);
}

// function showApp(appId) {
//   console.log(appId.id);
//   let app1 = document.getElementById("appRI");
//   let app2 = document.getElementById("appII");
//   if (appId.id === "RI") {
//     app1.classList.remove("hideApp");
//     app2.classList.add("hideApp");
//   } else {
//     app2.classList.remove("hideApp");
//     app1.classList.add("hideApp");
//   }
// }

// App Rhytm Input
//App Rhytm Input Exercises
let rhytmInputDb = [
  { q: [4, 4] },
  { q: [2, 1, 1, 1, 1, 2] },
  { q: [1, 1, 2, 4] },
  { q: [2, 4, 1, 1] },
  { q: [4, 2, 2] },
  { q: [1, 1, 2, 2, 2] },
  { q: [2, 2, 1, 1, 2] },
  { q: [1, 1, 2, 1, 1, 1, 1] }
];

var questionPlayer = 0;
let questionRI;
let indexRIQuestion = 0;
let i_RI_userInput = [];
var startMetronome = true;
var metronomeBeats = 0;
var i = 0;

function addInput(x) {
  if (x === 1) i_RI_userInput.push("assets/audio/g4eight.mp3");
  else if (x === 2) i_RI_userInput.push("assets/audio/g4quarter.mp3");
  else i_RI_userInput.push("assets/audio/g4half.mp3");
  console.log(i_RI_userInput);
}

function collectAnswer() {
  if (i == i_RI_userInput.length) {
    i = 0;
    return;
  }

  if (i < 1) playMetronome();

  let x = new Audio(i_RI_userInput[i]);
  if (i === 0) {
    setTimeout(() => {
      x.play();
      x.addEventListener("ended", collectAnswer);
      i++;
    }, 750);
  } else {
    x.play();
    x.addEventListener("ended", collectAnswer);
    i++;
  }
}

function repeatQuestion() {
  questionRI = rhytmInputDb[indexRIQuestion].q.map(x => {
    if (x == 1) return "assets/audio/g4eight.mp3";
    else if (x == 2) return "assets/audio/g4quarter.mp3";
    else return "assets/audio/g4half.mp3";
  });

  if (questionPlayer == questionRI.length) {
    questionPlayer = 0;
    return;
  }

  if (questionPlayer < 1) playMetronome();

  let x = new Audio(questionRI[questionPlayer]);
  if (questionPlayer === 0) {
    setTimeout(() => {
      x.play();
      x.addEventListener("ended", repeatQuestion);
      questionPlayer++;
    }, 750);
  } else {
    x.play();
    x.addEventListener("ended", repeatQuestion);
    questionPlayer++;
  }
}

function playMetronome() {
  const m = new Audio("assets/audio/metronome.wav");
  m.addEventListener("ended", playMetronome);
  if (metronomeBeats < 5) {
    setTimeout(() => {
      m.play();
      metronomeBeats++;
    }, 750);
  } else {
    metronomeBeats = 0;
    return;
  }
}

function nextQuestionRI() {
  document.getElementById("hintRI").innerHTML = "";
  indexRIQuestion++;
  i_RI_userInput = [];
  setTimeout(() => {
    repeatQuestion();
  }, 750);
}

function submitAnswerRI() {
  if (
    _.isEqual(
      questionRI.map(x => {
        return x.toString();
      }),
      i_RI_userInput
    )
  ) {
    document.getElementById("hintRI").innerHTML = "Correct!";
    document.getElementById("hintRI").style.color = "green";
  } else {
    document.getElementById("hintRI").innerHTML = "Wrong!";
    document.getElementById("hintRI").style.color = "red";
  }
  console.log(questionRI);
  console.log(i_RI_userInput);
  console.log(
    _.isEqual(
      questionRI.map(x => {
        return x.toString();
      }),
      i_RI_userInput
    )
  );
}

function popAnswer() {
  if (i_RI_userInput.length > 0) i_RI_userInput.pop();
  console.log(i_RI_userInput);
}
