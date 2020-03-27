let timeRemainingMinutesCounter = document.getElementById(
  "timeRemainingMinutes"
);
let timeRemainingSecondsCounter = document.getElementById(
  "timeRemainingSeconds"
);

let timeType = document.getElementById("timeType");
let background = document.getElementById("background");

let id;
let isOn = false;
let isOff = false;
let timesPaused = 0;

let stopped = false;
let paused = false;

let startButton = document.getElementById("start");
let pauseButton = document.getElementById("pause");
let stopButton = document.getElementById("stop");
let pauseText = document.getElementById("pauseText");

timeOn.addEventListener("input", checkIfTimesEntered);
timeOff.addEventListener("input", checkIfTimesEntered);
stopButton.addEventListener("click", stop);


function checkIfTimesEntered() {
  if (
    parseInt(timeOn.value.split(":")[1]) >= 0 &&
    parseInt(timeOn.value.split(":")[2]) >= 0 &&
    parseInt(timeOff.value.split(":")[1]) >= 0 &&
    parseInt(timeOff.value.split(":")[2]) >= 0
  ) {
    setInitialOnConditions();
    startButton.addEventListener("click", startOnTimer);
  }
}

function setInitialOnConditions() {
  let timeOn = document.getElementById("timeOn");
  timeOnMinutes = timeOn.value.split(":")[1];
  timeOnSeconds = timeOn.value.split(":")[2];
  setTimeOnRemaining();
}

function setTimeOnRemaining() {
  timeRemainingSeconds = parseInt(timeOnSeconds);
  timeRemainingMinutes = parseInt(timeOnMinutes);
}

function startOnTimer() {
  displayOnTimer();
  startButton.removeEventListener("click", startOnTimer);
  isOff = false;
  isOn = true;
  pauseButton.addEventListener("click", pause);

  id = setInterval(frame, 1000);
  function frame() {
    let timerFinished =
      timeRemainingMinutes === 0 && timeRemainingSeconds === 0;
    let zeroSecondsRemaining = timeRemainingSeconds === 0;
    if (paused) {
      clearInterval(id);
    } else if (timerFinished) {
      displayTimeRemaining();
      clearInterval(id);
      setInitialOffConditions();
      startOffTimer();
    } else if (zeroSecondsRemaining) {
      displayTimeRemaining();
      startNextMinute();
    } else {
      displayTimeRemaining();
      timeRemainingSeconds--;
    }
  }
}

function displayOnTimer() {
  timeType.innerHTML = "Focused";
  background.style.cssText = "background-color: #b5e7a0;";
}

function setTimeOffRemaining() {
  timeRemainingSeconds = parseInt(timeOffSeconds);
  timeRemainingMinutes = parseInt(timeOffMinutes);
}

function setInitialOffConditions() {
  let timeOff = document.getElementById("timeOff");
  timeOffMinutes = timeOff.value.split(":")[0];
  timeOffSeconds = timeOff.value.split(":")[1];
  setTimeOffRemaining();
}

function startOffTimer() {
  displayOffTimer();

  isOn = false;
  isOff = true;

  id = setInterval(frame, 1000);
  function frame() {
    let timerFinished =
      timeRemainingMinutes === 0 && timeRemainingSeconds === 0;
    let zeroSecondsRemaining = timeRemainingSeconds === 0;
    if (paused) {
      clearInterval(id);
    } else if (timerFinished) {
      displayTimeRemaining();
      clearInterval(id);
      setInitialOnConditions();
      startOnTimer();
    } else if (zeroSecondsRemaining) {
      displayTimeRemaining();
      startNextMinute();
    } else {
      displayTimeRemaining();
      timeRemainingSeconds--;
    }
  }
}

function displayOffTimer() {
  background.style.cssText = "background-color: #d5e1df;";
  timeType.innerHTML = "Relaxed";
}

function startNextMinute() {
  timeRemainingMinutes--;
  timeRemainingSeconds = 59;
}

function displayTimeRemaining() {
  timeRemainingMinutesCounter.innerHTML = timeRemainingMinutes;
  timeRemainingSecondsCounter.innerHTML = timeRemainingSeconds;
}

function pause() {
  timesPaused++;
  if (!paused) {
    paused = true;
    pauseText.innerHTML = "Resume";
    startButton.addEventListener("click", startOnTimer);
  } else {
    paused = false;
    pauseText.innerHTML = "Pause";
    if (isOn) {
      startOnTimer();
    }
    if (isOff) {
      startOffTimer();
    }
  }
}

function stop() {
  clearInterval(id);
  paused = false;
  pauseButton.innerHTML = "Pause";
  timeType.innerHTML = "";
  timeRemainingMinutesCounter.innerHTML = 0;
  timeRemainingSecondsCounter.innerHTML = 0;
  isOn = false;
  isOff = false;
  timesPaused = 0;
  setInitialOnConditions();
  startButton.addEventListener("click", startOnTimer);
}
