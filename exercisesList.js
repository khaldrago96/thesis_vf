/* eslint-disable prettier/prettier */
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


//App Rhytm Input
let rhytmInputDb = [
    { q: [2, 1, 1, 1, 1, 2] },
    { q: [1, 1, 2, 4] },
    { q: [2, 4, 1, 1] },
    { q: [4, 2, 2] },
    { q: [1, 1, 2, 2, 2] },
    { q: [4, 4] },
    { q: [2, 2, 1, 1, 2] },
    { q: [1, 1, 2, 1, 1, 1, 1] },
]