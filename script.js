let timeRemainingMinutesCounter = document.getElementById(
  "timeRemainingMinutes"
);
let timeRemainingSecondsCounter = document.getElementById(
  "timeRemainingSeconds"
);

let isOn = false;
let isOff = false;
let timesPaused = 0;

let paused = false;

let startButton = document.getElementById("start");
let pauseButton = document.getElementById("pause");
let stopButton = document.getElementById("stop");

timeOn.addEventListener("input", checkIfReady);
timeOff.addEventListener("input", checkIfReady);

function pause() {
  timesPaused++;
  if (paused === false) {
    paused = true;
    pauseButton.innerHTML = "Resume";
    startButton.addEventListener("click", startOnTimer);
  } else {
    paused = false;
    pauseButton.innerHTML = "Pause";
    if (isOn === true) {
      startOnTimer();
    }
    if (isOff === true) {
      startOffTimer();
    }
  }
}

function checkIfReady() {
  if (
    parseInt(timeOn.value.split(":")[0]) >= 0 &&
    parseInt(timeOn.value.split(":")[1]) >= 0 &&
    parseInt(timeOff.value.split(":")[0]) >= 0 &&
    parseInt(timeOff.value.split(":")[1]) >= 0
  ) {
    setInitialOnConditions();
    startButton.addEventListener("click", startOnTimer);
  }
}

function startOnTimer() {
  startButton.removeEventListener("click", startOnTimer);
  isOff = false;
  isOn = true;
  pauseButton.addEventListener("click", pause);

  let id = setInterval(frame, 1000);
  function frame() {
    if (paused === true) {
      clearInterval(id);
    } else if (timeRemainingMinutes === 0 && timeRemainingSeconds === 0) {
      timeRemainingMinutesCounter.innerHTML = timeRemainingMinutes;
      timeRemainingSecondsCounter.innerHTML = timeRemainingSeconds;
      clearInterval(id);
      setInitialOffConditions();
      startOffTimer();
    } else if (timeRemainingSeconds === 0) {
      timeRemainingMinutesCounter.innerHTML = timeRemainingMinutes;
      timeRemainingSecondsCounter.innerHTML = timeRemainingSeconds;
      timeRemainingMinutes--;
      timeRemainingSeconds = 59;
    } else {
      timeRemainingMinutesCounter.innerHTML = timeRemainingMinutes;
      timeRemainingSecondsCounter.innerHTML = timeRemainingSeconds;
      timeRemainingSeconds--;
    }
  }
}

function setInitialOnConditions() {
  let timeOn = document.getElementById("timeOn");
  timeOnMinutes = timeOn.value.split(":")[0];
  timeOnSeconds = timeOn.value.split(":")[1];
  timeRemainingSeconds = parseInt(timeOnSeconds);
  timeRemainingMinutes = parseInt(timeOnMinutes);
}

function setInitialOffConditions() {
  let timeOff = document.getElementById("timeOff");
  timeOffMinutes = timeOff.value.split(":")[0];
  timeOffSeconds = timeOff.value.split(":")[1];
  timeRemainingSeconds = parseInt(timeOffSeconds);
  timeRemainingMinutes = parseInt(timeOffMinutes);
}

function startOffTimer() {
  isOn = false;
  isOff = true;

  let id = setInterval(frame, 1000);
  function frame() {
    if (paused === true) {
      clearInterval(id);
    } else if (timeRemainingMinutes === 0 && timeRemainingSeconds === 0) {
      timeRemainingMinutesCounter.innerHTML = timeRemainingMinutes;
      timeRemainingSecondsCounter.innerHTML = timeRemainingSeconds;
      clearInterval(id);
      timeRemainingSeconds = parseInt(timeOnSeconds);
      timeRemainingMinutes = parseInt(timeOnMinutes);
      setInitialOnConditions();
      startOnTimer();
    } else if (timeRemainingSeconds === 0) {
      timeRemainingMinutesCounter.innerHTML = timeRemainingMinutes;
      timeRemainingSecondsCounter.innerHTML = timeRemainingSeconds;
      timeRemainingMinutes--;
      timeRemainingSeconds = 59;
    } else {
      timeRemainingMinutesCounter.innerHTML = timeRemainingMinutes;
      timeRemainingSecondsCounter.innerHTML = timeRemainingSeconds;
      timeRemainingSeconds--;
    }
  }
}
