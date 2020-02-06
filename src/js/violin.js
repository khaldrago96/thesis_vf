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
document.getElementById("appII").classList.add("hideApp");
document.getElementById("appRI").classList.add("hideApp");
pianoBuzz.addEventListener("mousedown", e => {
  if (e.target.dataset.note !== "100") {
    let playSound = new buzz.sound(audioFiles[e.target.dataset.note]);
    playSound.play();
  }
});

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
var IIstart = false;
function createQuestion() {
  if (intervalAppIndex !== intervalAppDb.length) {
    IIstart = true;
    let indexToPlay = intervalAppDb[intervalAppIndex];
    let x = new buzz.sound(audioFiles[indexToPlay.q[0]]);
    let y = new buzz.sound(audioFiles[indexToPlay.q[1]]);
    document.getElementById("hint").innerHTML =
      "First key to be played: " + indexToPlay.startKey;
    x.play();
    setTimeout(() => {
      y.play();
    }, 600);
  } else nextQ();
}

let indicator = document.getElementById("indicator");
function checkIntervalAppAnswer(clickedBtn) {
  if (IIstart) {
    let answer = intervalAppDb[intervalAppIndex].s;
    let correctInput = document.getElementById(clickedBtn.id);
    if (clickedBtn.id === answer) {
      trueAnswer++;
      indicator.style.color = "green";
      indicator.innerHTML = "Correct!";
      correctInput.classList.add("btn-success");
      correctInput.classList.remove("btn-info");
      // new buzz.sound("./assets/audio/right-answer.mp3").play();
    } else {
      indicator.style.color = "red";
      indicator.innerHTML = "Wrong!";
      correctInput.classList.add("btn-danger");
      document.getElementById(answer).classList.remove("btn-info");
      document.getElementById(answer).classList.add("btn-success");
      // new buzz.sound("./assets/audio/wrong-answer.mp3").play();
    }
  }
}

function nextQ() {
  if (IIstart && intervalAppIndex !== intervalAppDb.length) {
    let items = document.querySelectorAll(".a");
    indicator.innerHTML = "";
    for (let i = 0; i < items.length; i++) {
      items[i].classList.remove("btn-success", "btn-danger");
      items[i].classList.add("btn-info");
    }
    setTimeout(() => {
      createQuestion();
    }, 500);
  } else {
    document.getElementById("appInterval").classList.add("hideApp");
    document.getElementById("hint").innerHTML = "Exercise done!";
    indicator.innerHTML = "Score: " + trueAnswer + "/" + intervalAppDb.length;
  }

  intervalAppIndex++;
}

function showApp(appId) {
  let app1 = document.getElementById("appRI");
  let app2 = document.getElementById("appRT");
  let app3 = document.getElementById("appII");
  if (appId.id === "RI") {
    app1.classList.remove("hideApp");
    app2.classList.add("hideApp");
    app3.classList.add("hideApp");
  } else if (appId.id === "RT") {
    app2.classList.remove("hideApp");
    app1.classList.add("hideApp");
    app3.classList.add("hideApp");
    createQuestionRT();
  } else {
    app3.classList.remove("hideApp");
    app1.classList.add("hideApp");
    app2.classList.add("hideApp");
  }
}

// App Rhytm Input
//App Rhytm Input Exercises
let rhytmInputDb = [
  { q: [4, 4] },
  { q: [1, 1, 4, 2] },
  { q: [2, 4, 1, 1] },
  { q: [4, 2, 2] },
  { q: [1, 1, 2, 4] }
];

var questionPlayer = 0;
let questionRI;
let indexRIQuestion = 0;
let i_RI_userInput = [];
var startMetronome = true;
var metronomeBeats = 0;
var i = 0;
const VF = Vex.Flow;
let noteInput = [];
let letsCount = 0;
let trueAnswerRI = 0;

function addInput(e) {
  var vf;
  if (document.getElementById("boo") !== null) {
    document.getElementById("boo").remove();
  }
  eleBoo = document.createElement("div");
  eleBoo.setAttribute("id", "boo");
  document.getElementById("parent").appendChild(eleBoo);
  vf = new VF.Factory({ renderer: { elementId: "boo", width: 500 } });

  var score = vf.EasyScore();
  var system = vf.System();
  switch (e.id) {
    case "1":
      noteInput.push("G4/8");
      i_RI_userInput.push("assets/audio/g4eight.mp3");
      break;
    case "2":
      noteInput.push("G4/q");
      i_RI_userInput.push("assets/audio/g4quarter.mp3");
      break;
    case "4":
      noteInput.push("G4/h");
      i_RI_userInput.push("assets/audio/g4half.mp3");
      break;
  }
  let setTime = parseInt(e.id) + letsCount + "/8";
  score.set({ time: setTime });
  system.addStave({
    voices: [score.voice(score.notes(noteInput.toString()))]
  });
  switch (e.id) {
    case "1":
      letsCount++;
      break;
    case "2":
      letsCount += 2;
      break;
    case "4":
      letsCount += 4;
      break;
  }
  vf.draw();
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
  if (indexRIQuestion !== rhytmInputDb.length) {
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
  } else nextQuestionRI();
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
  if (indexRIQuestion !== rhytmInputDb.length) {
    i_RI_userInput = [];
    document.getElementById("boo").remove();
    noteInput = [];
    letsCount = 0;
    document.getElementById("hintRI").innerHTML = "";
    indexRIQuestion++;
    i_RI_userInput = [];
    setTimeout(() => {
      repeatQuestion();
    }, 750);
  } else {
    document.getElementById("appRhytmI").classList.add("hideApp");
    document.getElementById("summaryRI").innerHTML =
      "Exercise done! <br>Score: " + trueAnswerRI + "/" + rhytmInputDb.length;
  }
}
function submitAnswerRI() {
  if (noteInput.length > 0 && questionRI) {
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
      trueAnswerRI++;
    } else {
      document.getElementById("hintRI").innerHTML = "Wrong!";
      document.getElementById("hintRI").style.color = "red";
    }
  }
}

function popAnswer() {
  if (i_RI_userInput.length > 0) {
    i_RI_userInput = [];
    document.getElementById("boo").remove();
    noteInput = [];
    letsCount = 0;
  }
}

/* App Rhytm Tapping */
let rhythmTappingDb = [
  "G4/q,G4/q,G4/h",
  "G4/h,G4/h",
  "G4/8,G4/h,G4/q,G4/8",
  "G4/q,G4/q,G4/8,G4/q,G4/8",
  "G4/q,G4/8,G4/8,G4/h"
];
let indexRTQuestion = 0;
let metronomeRT = false;
let startBar;
let progressBar = 0;
function createQuestionRT() {
  startRT();
  metronomeRT = true;
  playMetronomeRT();
  if (document.getElementById("noteRT") !== null) {
    document.getElementById("noteRT").remove();
  }

  eleBoo = document.createElement("div");
  eleBoo.setAttribute("id", "noteRT");
  document.getElementById("parentRT").appendChild(eleBoo);
  vf = new VF.Factory({
    renderer: { elementId: "noteRT", height: 100, width: 500 }
  });
  var score = vf.EasyScore();
  var system = vf.System();

  score.set({ time: "4/4" });
  system
    .addStave({
      voices: [score.voice(score.notes(rhythmTappingDb[indexRTQuestion]))]
    })
    .addTimeSignature("4/4");
  vf.draw();
}

function playMetronomeRT() {
  // const m = new Audio("assets/audio/metronome.wav");
  // m.addEventListener("ended", playMetronomeRT);
  // if (metronomeRT)
  //   setTimeout(() => {
  //     m.play();
  //   }, 750);
  // else return;
}
function nextQuestionRT() {
  indexRTQuestion++;
  stopmet();
  document.getElementById("noteRT").remove();
  setTimeout(() => {
    createQuestionRT();
  }, 1000);
}

function stopmet() {
  metronomeRT = false;
  clearInterval(startBar);
  let ele = document.getElementsByClassName("a");
  for (let i = 0; i < 4; i++) ele[i].style.backgroundColor = "white";
}
document.getElementById("shadow-bar").classList.add("hideApp");

function startRT() {
  document.getElementById("shadow-bar").classList.remove("hideApp");
  progressBar = 0;
  startBar = setInterval(() => {
    if (progressBar < 4) {
      document.getElementById(
        "RT" + progressBar.toString()
      ).style.backgroundColor = "red";
      progressBar++;
    } else {
      progressBar = 0;
      let ele = document.getElementsByClassName("a");
      for (let i = 0; i < 4; i++) ele[i].style.backgroundColor = "white";
    }
  }, 750);
}
