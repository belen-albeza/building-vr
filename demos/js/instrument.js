'use strict';

const NOTES = {
    'C4': 261.63,
    'D4': 293.66,
    'E4': 329.63,
    'F4': 349.23,
    'F4#': 370,
    'G4': 392,
    'G4#': 415.30,
    'A4': 440,
    'B4': 493.88,
    'C5': 523.25,
    'C5#': 554.4,
    'D5': 587.3,
    'E5b': 622.3,
    'E5': 659.3,
    'F5#': 740,
    'G5': 784
};

const CHORDS = {
    'C4': ['C4', 'E4', 'G4'],
    'D4': ['D4', 'F4#', 'A4'],
    'E4': ['E4', 'G4#', 'B4'],
    'F4': ['F4', 'A4', 'C5'],
    'G4': ['G4', 'B4', 'D5'],
    'A4': ['A4', 'C5#', 'E5'],
    'B4': ['B4', 'E5b', 'F5#'],
    'C5': ['C5', 'E5', 'G5']
};

function radians(degrees) {
    return degrees * Math.PI / 180;
}

function Instrument(ctx) {
    this.ctx = ctx;
    this.volumeNode = this.ctx.createGain();
    this.volumeNode.gain.value = 1;
    this.volumeNode.connect(this.ctx.destination);
}

Instrument.prototype.playChord = function (chord, duration, position, orientation) {
    CHORDS[chord.toUpperCase()].forEach(function (note) {
        this.play(NOTES[note], duration, position, orientation);
    }, this);
};

Instrument.prototype.play = function (freq, duration, position, orientation) {
    this.ctx.listener.setOrientation(
        orientation.x, orientation.y, orientation.z,
        0, 1, 0);

    const START_TIME = this.ctx.currentTime;
    const END_TIME = START_TIME + duration;

    let gain = this.ctx.createGain();
    let osc = this.ctx.createOscillator();
    let panner = this.ctx.createPanner();

    panner.setPosition(position.x, position.y, position.z);
    panner.connect(this.volumeNode);

    gain.gain.setValueAtTime(1, START_TIME);
    gain.connect(panner);

    osc.type = 'sine';
    osc.frequency.value = freq;
    osc.connect(gain);

    osc.start(START_TIME);
    osc.stop(END_TIME);
    gain.gain.linearRampToValueAtTime(0, END_TIME - duration * 0.1);
};
