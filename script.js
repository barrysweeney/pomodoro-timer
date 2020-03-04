let timeRemainingMinutesCounter = document.getElementById(
  "timeRemainingMinutes"
);
let timeRemainingSecondsCounter = document.getElementById(
  "timeRemainingSeconds"
);

let timeOn = document.getElementById("timeOn");
let timeOff = document.getElementById("timeOff");

timeOn.addEventListener("input", checkIfReady);
timeOff.addEventListener("input", checkIfReady);

let startButton = document.getElementById("start");

function checkIfReady() {
  if (
    parseInt(timeOn.value.split(":")[0]) >= 0 &&
    parseInt(timeOn.value.split(":")[1]) >= 0 &&
    parseInt(timeOff.value.split(":")[0]) >= 0 &&
    parseInt(timeOff.value.split(":")[1]) >= 0
  ) {
    startButton.addEventListener("click", startOnTimer);
  }
}

function startOnTimer() {
  let timeOn = document.getElementById("timeOn");
  let timeOnMinutes = timeOn.value.split(":")[0];
  let timeOnSeconds = timeOn.value.split(":")[1];
  let timeRemainingSeconds = parseInt(timeOnSeconds);
  let timeRemainingMinutes = parseInt(timeOnMinutes);
  let id = setInterval(frame, 1000);
  function frame() {
    if (timeRemainingMinutes === 0 && timeRemainingSeconds === 0) {
      timeRemainingMinutesCounter.innerHTML = timeRemainingMinutes;
      timeRemainingSecondsCounter.innerHTML = timeRemainingSeconds;
      clearInterval(id);
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

function startOffTimer() {
  let timeOff = document.getElementById("timeOff");
  let timeOffMinutes = timeOff.value.split(":")[0];
  let timeOffSeconds = timeOff.value.split(":")[1];
  let timeRemainingSeconds = parseInt(timeOffSeconds);
  let timeRemainingMinutes = parseInt(timeOffMinutes);
  let id = setInterval(frame, 1000);
  function frame() {
    if (timeRemainingMinutes === 0 && timeRemainingSeconds === 0) {
      timeRemainingMinutesCounter.innerHTML = timeRemainingMinutes;
      timeRemainingSecondsCounter.innerHTML = timeRemainingSeconds;
      clearInterval(id);
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
