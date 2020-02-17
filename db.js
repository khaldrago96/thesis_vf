/* eslint-disable prettier/prettier */
// App Interval Identification
// s stands for solution, q : piano data-key, startKey as hint
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
let intervalAppDb = [
    { s: "unison", q: [0, 0], startKey: "C" },
    { s: "major", q: [2, 3], startKey: "E" },
    { s: "major", q: [7, 12], startKey: "A#" },
    { s: "minor", q: [9, 1], startKey: "D" },
    { s: "unison", q: [2, 2], startKey: "E" },
    { s: "major", q: [7, 6], startKey: "B" },
    { s: "minor", q: [4, 11], startKey: "G" }
];

//App Rhythm Input
// 1: 1/8 , 2: 1/4, 3: 1/2
let rhytmInputDb = [
    { q: [4, 4] },
    { q: [1, 1, 4, 2] },
    { q: [2, 4, 1, 1] },
    { q: [4, 2, 2] },
    { q: [1, 1, 2, 4] }
];

let solutionKeyRI = [
    "G4/h,G4/h",
    "G4/8,G4/8,G4/h,G4/q",
    "G4/q,G4/h,G4/8,G4/8",
    "G4/h,G4/q,G4/q",
    "G4/8,G4/8,G4/q,G4/h"
]


//App Rhythm Tapping
let rhythmTappingDb = [
    "G4/h,G4/h",
    "G4/8,G4/h,G4/q,G4/8",
    "G4/q,G4/q,G4/h",
    "G4/q,G4/q,G4/8,G4/q,G4/8",
    "G4/q,G4/8,G4/8,G4/h"
];

//solution for Rhythm Tapping
let solutionKeyRT = [
    "35,275",
    "35,115,320,430",
    "35,160,282",
    "35,145,252,328,433",
    "35,150,225,303"
];