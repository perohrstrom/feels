
// The midi notes of a scale
var notes = [ 53, 71, 50, 48, 76, 73, 69, 72];

// For automatically playing the song
var index = 0;
//var original = [
// { note: 4, duration: 400, display: "D" },
//   { note: 0, duration: 200, display: "G" },
  // { note: 1, duration: 200, display: "A" },
  // { note: 2, duration: 200, display: "B" }]
//   { note: 3, duration: 200, display: "C" },
//   { note: 4, duration: 400, display: "D" },
//   { note: 0, duration: 400, display: "G" },
//   { note: 0, duration: 400, display: "G" }]


// Math.floor(Math.random() * (7 - 0 + 1)) + 0;
// notes index correspond to: anger, fear, sadness, disgust, surprise, anticipation, trust, joy
var emotions = [];
for (var i =0; i < 40; i++){
  emotions.push({ note: Math.floor(Math.random() * (7 - 0 + 1)) + 0, duration: 500, display: "D" });

}
//   { note: 1, duration: 400, display: "D" },
//   { note: 2, duration: 600, display: "D" },
//   { note: 3, duration: 400, display: "D" },
//   { note: 4, duration: 400, display: "D" },
//   { note: 5, duration: 400, display: "D" },
//   { note: 6, duration: 400, display: "D" },
//   { note: 7, duration: 600, display: "G" },
//   { note: 6, duration: 400, display: "D" },
//   { note: 5, duration: 400, display: "G" },
//   { note: 4, duration: 600, display: "A" },
//   { note: 3, duration: 400, display: "B" },
//   { note: 2, duration: 400, display: "C" },
//   { note: 1, duration: 400, display: "D" },
//   { note: 0, duration: 400, display: "G" },
//   { note: 0, duration: 400, display: "D" },
//   { note: 1, duration: 400, display: "G" },
//   { note: 2, duration: 600, display: "A" },
//   { note: 3, duration: 400, display: "B" },
//   { note: 4, duration: 400, display: "C" },
//   { note: 5, duration: 400, display: "D" },
//   { note: 6, duration: 400, display: "G" },
//   { note: 7, duration: 600, display: "G" },
//   { note: 6, duration: 400, display: "D" },
//   { note: 5, duration: 400, display: "G" },
//   { note: 4, duration: 600, display: "A" },
//   { note: 3, duration: 400, display: "B" },
//   { note: 2, duration: 400, display: "C" },
//   { note: 1, duration: 400, display: "D" },
//   { note: 0, duration: 400, display: "G" },
//   { note: 4, duration: 600, display: "A" },
//   { note: 3, duration: 400, display: "B" },
//   { note: 2, duration: 400, display: "C" },
//   { note: 1, duration: 400, display: "D" },
//   { note: 0, duration: 400, display: "G" }
// ];

var song = emotions;
var trigger = 0;
var autoplay = false;
var osc;

function setup() {

  createCanvas(1200, 700);
  var div = createDiv("Click to play notes or ")
  div.id("instructions");
  var button = createA("#","play song automatically.");
  button.parent("instructions");
  // Trigger automatically playing
  button.mousePressed(function() {
    if (!autoplay) {
      index = 0;
      autoplay = true;
    }
  });

  // A triangle oscillator
  osc = new p5.TriOsc();
  // Start silent
  osc.start();
  osc.amp(0);
}

// A function to play a note
function playNote(note, duration) {
  osc.freq(midiToFreq(note));
  // Fade it in
  osc.fade(0.5,0.2);

  // If we sest a duration, fade it out
  if (duration) {
    setTimeout(function() {
      osc.fade(0,0.2);
    }, duration-50);
  }
}

function draw() {

  // If we are autoplaying and it's time for the next note
  if (autoplay && millis() > trigger){
    playNote(notes[song[index].note], song[index].duration);
    trigger = millis() + song[index].duration;
    // Move to the next note
    index ++;
  // We're at the end, stop autoplaying.
  } else if (index >= song.length) {
    autoplay = false;
  }


  // Draw a keyboard

  // The width for each key
  var w = width / notes.length;
  for (var i = 0; i < notes.length; i++) {
    var x = i * w;
    // If the mouse is over the key
    if (mouseX > x && mouseX < x + w && mouseY < height) {
      // If we're clicking this is the color that displays 
      if (mouseIsPressed) {
         if (i === 0) {
        fill(201,0,20);
      } else if (i === 1){
        fill(46,149,20);
      } else if (i === 2){
        fill(92,86,252);
      } else if (i === 3){
        fill(246,87,253);
      } else if (i === 4){
        fill(111,191,253);
      } else if (i === 5){
        fill(244,123,31);
      } else if (i === 6){
        fill(115,254,93);
      } else {
        fill(252,254,96);
      }
         

      // Or just rolling over
      } else {
        fill(255); //white when mouse hover 
      }
    } else {
      fill(200); // light gray by default 
    }

    // Or if we're playing the song, let's highlight it too
    if (autoplay && i === song[index-1].note) {
      if (i === 0) {
        fill(201,0,20);
      } else if (i === 1){
        fill(46,149,20);
      } else if (i === 2){
        fill(92,86,252);
      } else if (i === 3){
        fill(246,87,253);
      } else if (i === 4){
        fill(111,191,253);
      } else if (i === 5){
        fill(244,123,31);
      } else if (i === 6){
        fill(115,254,93);
      } else {
        fill(252,254,96);
      }
    }

    // Draw the key
    rect(x, 0, w-1, height-1);
  }

}

// When we click
function mousePressed() {
  // Map mouse to the key index
  var key = floor(map(mouseX, 0, width, 0, notes.length));
  playNote(notes[key]);
}

// Fade it out when we release
function mouseReleased() {
  osc.fade(0,0.5);
}
