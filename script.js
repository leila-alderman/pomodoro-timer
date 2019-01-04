var time;
var sessionTime;
var breakTime;
var timeInterval;
var stopped;
var onBreak;

const defaultSessionTime = 1500;
const defaultBreakTime = 300

function setOnBreakTrue() {
    onBreak = true;
    title = document.getElementById("title");
    title.textContent = "Break";
}

function setOnBreakFalse() {
    onBreak = false;
    title = document.getElementById("title");
    title.textContent = "Session";
}

function displayTime() {
    var timer = document.getElementById("timer");
    timer.textContent = String(Math.floor(time/60)) + ":" + String(time%60).padStart(2, '0'); 
};

function displaySessionTime() {
    var session = document.getElementById("session");
    session.textContent = sessionTime/60
};

function displayBreakTime() {
    var breaking = document.getElementById("break");
    breaking.textContent = breakTime/60
}

function initialize() {
    stopped = true;
    setOnBreakFalse();
    pause();
    sessionTime = defaultSessionTime;
    breakTime = defaultBreakTime;
    time = sessionTime;
    displayTime();
    displaySessionTime();
    displayBreakTime();
    timerOff();
}
initialize()

function countdown() {
    if (!timeInterval) {
        timeInterval = setInterval(function() {
            time--;
            if(time <= 0) {
               breakRun();
            }
            displayTime();
        }, 1000);
        stopped = false;
    }
    timerOn();
};

function timerOn() {
    timerOff();
    var timer = document.getElementById("flex-container");
    
    if(onBreak){
        timer.classList.add('break-on');
    }else {
        timer.classList.add('session-on');
    }
}

function timerOff() {
    var timer = document.getElementById("flex-container");
    timer.className = '';
}

function pause() {
    if (onBreak) {
        alert("That's cheating! Go away!")
    } else {
        clearInterval(timeInterval)
        timeInterval = undefined;
    }
    timerOff();
};

function stop() {
    setOnBreakFalse();
    stopped = true;
    pause();
    time = sessionTime;
    displayTime();
}

function breakRun() {
    time = breakTime;
    setOnBreakTrue();
    timerOn();
}

function sessionDown() {
    if (sessionTime > 0) {
        sessionTime -= 60;
    }
    if(stopped) {
        time = sessionTime;
        displayTime();
    }
    displaySessionTime();
}

function sessionUp() {
    sessionTime += 60;
    if(stopped) {
        time = sessionTime;
        displayTime();
    }
    displaySessionTime();
}

function breakDown() {
    if (breakTime > 0) {
        breakTime -= 60;
    }
    displayBreakTime();
}

function breakUp() {
    breakTime += 60;
    displayBreakTime();
}


var play = document.getElementById("play");
play.addEventListener('click', e => {countdown()});

var pauseButton = document.getElementById("pause");
pauseButton.addEventListener('click', e => {pause()});

var stopButton = document.getElementById("stop");
stopButton.addEventListener('click', e => {stop()});

var refreshButton = document.getElementById("refresh");
refreshButton.addEventListener('click', e => {initialize()});

var sessionUpButton = document.getElementById("session-up");
sessionUpButton.addEventListener('click', e => {sessionUp()});

var sessionDownButton = document.getElementById("session-down");
sessionDownButton.addEventListener('click', e => {sessionDown()});

var breakUpButton = document.getElementById("break-up");
breakUpButton.addEventListener('click', e => {breakUp()});

var breakDownButton = document.getElementById("break-down");
breakDownButton.addEventListener('click', e => {breakDown()});

