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
  buttonRandomController = null;
}

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
    document.getElementById("hint").style.color = "red";
    document.getElementById("hint").innerHTML = "Right answer: " + x.charAt(0);
  }
}

const questionArray = [
  {
    a: "C4",
    l: ["C", "D", "A", "E"]
  },
  {
    a: "D4",
    l: ["F", "D", "G", "B"]
  },
  {
    a: "G4",
    l: ["G", "D", "E", "F"]
  },
  {
    a: "B4",
    l: ["F", "A", "B", "E"]
  },
  {
    a: "A4",
    l: ["C", "A", "E", "B"]
  },
  {
    a: "C4",
    l: ["E", "B", "C", "G"]
  },
  {
    a: "F4",
    l: ["D", "G", "F", "E"]
  },
  {
    a: "E4",
    l: ["E", "C", "A", "D"]
  }
];
let collections = [];

function playEight() {
  let x = document.getElementById("btn-eight");
  collections.push(x.value);
}

function playQuarter() {
  let x = document.getElementById("btn-quarter");
  collections.push(x.value);
}

function playHalf() {
  let x = document.getElementById("btn-half");
  collections.push(x.value);
}
var i = 0;
let a = 0;
let pianoRecord = [];
function collectAnswer() {
  let userInput = [];
  let audioEight = document.getElementById("1");
  let audioQuarter = document.getElementById("2");
  let audioHalf = document.getElementById("4");
  userInput = collections.map(val => {
    if (val == 1) val = audioEight;
    else if (val == 2) val = audioQuarter;
    else val = audioHalf;
    return val;
  });

  if (i == userInput.length) {
    i = 0;
    collections = [];
    userInput = [];
    return;
  }
  userInput[i].addEventListener("ended", collectAnswer);
  userInput[i].play();
  i++;
}

function playRecorder() {
  if (a === pianoRecord.length) {
    a = 0;
    return;
  }
  document
    .getElementById(pianoRecord[a])
    .addEventListener("ended", playRecorder);
  document.getElementById(pianoRecord[a]).play();
  a++;
}
