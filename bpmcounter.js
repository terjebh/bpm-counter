// Text
let bpm = document.getElementById("bpm");

// Array to store intervals in milliseconds
let clickArr = [];
// Array to store tempo, to evaluate if average has gotten stuck.
let beatsArr = [];


document.addEventListener("keypress", shortcutChecker);
function shortcutChecker() {
    if (window.event.key === " ") {
        button.classList.add("clicked");
        countBeats();
        setTimeout(() => {
            button.classList.remove("clicked")
        }, 50);
    }
}
// Button
let button = document.getElementById("bpmcounter");
button.addEventListener("click", countBeats);
function countBeats() {
    // Time to be added to list
    let date = new Date().getTime();
    // Add first number/starting time
    if (clickArr.length <= 1) {
        clickArr.push(date)
        return;
    }
    
    // first and last pieces of array
    let firstBeat = clickArr[0];
    let lastBeat = clickArr[clickArr.length -1];
    
    let timePassed = ((lastBeat - firstBeat) / 1000);
    // Determines beats per minute
    let beats = (clickArr.length / timePassed) * 60;
    
    // If tap is unused for longer period of time, reset
    if (date - lastBeat > 2000) {
        clickArr = [];
        bpm.innerText = "Tap!"
    }
    
    // Starts when length is 32 beats
    if (clickArr.length > 31) {
        beatsArr.push(beats.toFixed(1));
    }
    // Evaluates if the average has gotten stuck, and resets if needed.
    if (beatsArr.length === 4) {
        let averageBeats = (parseInt(beatsArr[0]) + parseInt(beatsArr[1]) + parseInt(beatsArr[2]) + parseInt(beatsArr[3])) / 4;
        if (Math.round(averageBeats) === Math.round(beats)) {
            clickArr = [];
            return;
        }
    }
    // Resets beats array to keep it updated
    if (beatsArr.length > 3) {
        beatsArr = [];
    }
    
    
    // Tempo has been tapped more than once, and is ready to show content:
    if (clickArr.length > 1) {
        clickArr.push(date);
        if (beats !== Infinity || beats !== NaN) {
            bpm.innerText = beats.toFixed(1);
        }
    }
}

// Reset
let reset = document.getElementById("reset");
reset.onclick = function() {
    clickArr = [];
    beatsArr = [];
    bpm.innerText = "Tap!"
    reset.blur();
}
