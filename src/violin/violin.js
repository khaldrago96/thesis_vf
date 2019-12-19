/*
  Buttons for rhytm training
*/
const synth = new Tone.Synth();
// synth.oscillator.type = "sine";
synth.toMaster();

const piano = document.getElementById("piano");

piano.addEventListener("mousedown", e => {
  synth.triggerAttackRelease(e.target.dataset.note);
});

piano.addEventListener("mouseup", e => {
  synth.triggerRelease();
});

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
    // document.getElementById(button.id.toString()).style.backgroundColor = "red";

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

// function piano(x) {
//   let tuts = x.getAttribute("data-key");
//   document.getElementById(tuts).play();
//   pianoRecord.push(tuts);
// }

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

function reset() {
  a = 0;
  i = 0;
  collections = [];
  pianoRecord = [];
}

// const synth = new Tone.Synth();
// synth.oscillator.type = "sine";
// synth.toMaster();

// const piano = document.getElementById("piano");

// piano.addEventListener("mousedown", e => {
//   synth.triggerAttack(e.target.dataset.note);
// });

// piano.addEventListener("mouseup", e => {
//   synth.triggerRelease();
// });

// document.addEventListener("keydown", e => {
//   switch (e.key) {
//     case "d":
//       return synth.triggerAttack("C4");
//     case "r":
//       return synth.triggerAttack("C#4");
//     case "f":
//       return synth.triggerAttack("D4");
//     case "t":
//       return synth.triggerAttack("D#4");
//     case "g":
//       return synth.triggerAttack("E4");
//     case "h":
//       return synth.triggerAttack("F4");
//     case "u":
//       return synth.triggerAttack("F#4");
//     case "j":
//       return synth.triggerAttack("G4");
//     case "i":
//       return synth.triggerAttack("G#4");
//     case "k":
//       return synth.triggerAttack("A4");
//     case "o":
//       return synth.triggerAttack("A#4");
//     case "l":
//       return synth.triggerAttack("B4");
//     default:
//       return;
//   }
// });

// document.addEventListener("keyup", e => {
//   switch (e.key) {
//     case "d":
//     case "r":
//     case "f":
//     case "t":
//     case "g":
//     case "h":
//     case "u":
//     case "j":
//     case "i":
//     case "k":
//     case "o":
//     case "l":
//        synth.triggerRelease();
//   }
// });
