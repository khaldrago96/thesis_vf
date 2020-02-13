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
    let playSound = new Audio(audioFiles[e.target.dataset.note]);
    playSound.play();
  }
});

// App Interval Identification
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
    let x = new Audio(audioFiles[indexToPlay.q[0]]);
    let y = new Audio(audioFiles[indexToPlay.q[1]]);
    document.getElementById("hint").innerHTML =
      "First key to be played: " + indexToPlay.startKey;
    setTimeout(() => {
      x.play();
    }, 600);
    setTimeout(() => {
      y.play();
    }, 1200);
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
    } else {
      indicator.style.color = "red";
      indicator.innerHTML = "Wrong!";
      correctInput.classList.add("btn-danger");
      document.getElementById(answer).classList.remove("btn-info");
      document.getElementById(answer).classList.add("btn-success");
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
  "G4/h,G4/h",
  "G4/8,G4/h,G4/q,G4/8",
  "G4/q,G4/q,G4/h",
  "G4/q,G4/q,G4/8,G4/q,G4/8",
  "G4/q,G4/8,G4/8,G4/h"
];
let indexRTQuestion = 0;
let startBar, inputBar;
let progressBar = 0;
let marginleftRT = 20;
let solutionKeyRT = [
  "25,265",
  "25,105,315,430",
  "25,150,272",
  "25,135,245,320,432",
  "25,140,215,295"
];
document.getElementById("shadow-bar").classList.add("hideApp");

function createQuestionRT() {
  setTimeout(() => {
    startRT();
  }, 750);
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
  system.addStave({
    voices: [score.voice(score.notes(rhythmTappingDb[indexRTQuestion]))]
  });
  vf.draw();
}

function startRT() {
  document.getElementById("shadow-bar").classList.remove("hideApp");
  startBar = setInterval(() => {
    if (progressBar < 4) {
      document.getElementById(
        "RT" + progressBar.toString()
      ).style.backgroundColor = "red";
      progressBar++;
    } else {
      marginleftRT = 0;
      progressBar = 1;
      let ele = document.getElementsByClassName("a");
      for (let i = 1; i < 4; i++) ele[i].style.backgroundColor = "white";
    }
  }, 750);
  inputBar = setInterval(() => {
    marginleftRT = marginleftRT + 1;
  }, 6);
}

function playMetronomeRT() {
  const m = new Audio("assets/audio/metronome.wav");
  metronomebar = setInterval(() => {
    m.play();
  }, 750);
}

function nextQuestionRT() {
  stopmet();
  progressBar = 0;
  let removeSolutionRT = document.getElementById("sb-solution");
  let removeAnswerRT = document.getElementById("sb-parent");
  while (removeSolutionRT.firstChild) removeSolutionRT.firstChild.remove();
  while (removeAnswerRT.firstChild) removeAnswerRT.firstChild.remove();
  document.getElementById("noteRT").remove();
  indexRTQuestion++;
  if (indexRTQuestion !== rhythmTappingDb.length)
    setTimeout(() => {
      createQuestionRT();
    }, 750);
  else {
    document.getElementById("appRT").classList.add("hideApp");
    endPage();
  }
}

function stopmet() {
  marginleftRT = 0;
  clearInterval(metronomebar);
  clearInterval(inputBar);
  let ele = document.getElementsByClassName("a");
  clearInterval(startBar);
  for (let i = 1; i < 4; i++) ele[i].style.backgroundColor = "white";
}

function inputRT() {
  let answer = document.createElement("div");
  answer.setAttribute("id", "answerRT");
  answer.classList.add("answerRtClass");
  answer.style.left = marginleftRT.toString() + "px";
  document.getElementById("sb-parent").appendChild(answer);
}

function showHint() {
  solutionKeyRT[indexRTQuestion].split(",").forEach(x => {
    let solution = document.createElement("div");
    solution.setAttribute("id", "solutionRT");
    solution.classList.add("solutionClassRT");
    solution.style.left = x.toString() + "px";
    document.getElementById("sb-solution").appendChild(solution);
  });
  let blurAnswer = document.getElementsByClassName("answerRtClass");
  for (let i = 0; i < blurAnswer.length; i++)
    blurAnswer[i].style.opacity = "0.5";
}

document.getElementById("endPage").classList.add("hideApp");
function endPage() {
  document.getElementById("endPage").classList.remove("hideApp");
}
