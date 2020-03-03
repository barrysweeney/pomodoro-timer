const timeOn = document.getElementById("timeOn").innerHTML;
const timeOff = document.getElementById("timeOff").innerHTML;
const timeRemainingCounter = document.getElementById("timeRemaining");
let id;


startOnTimer();

function startOnTimer(){
let timeRemaining = parseInt(timeOn)
id = setInterval(frame, 1000);
  function frame() {
    if(timeRemaining === 0 ){
        timeRemainingCounter.innerHTML = 0;
        clearInterval(id);
        startOffTimer();
    }else{
          timeRemainingCounter.innerHTML = timeRemaining;
          timeRemaining --;
    }
      }
}

function startOffTimer(){
    let timeRemaining = parseInt(timeOff)
    id = setInterval(frame, 1000);
      function frame() {
        if(timeRemaining === 0 ){
            timeRemainingCounter.innerHTML = 0;
            clearInterval(id);
            startOnTimer();
        }else{
              timeRemainingCounter.innerHTML = timeRemaining;
              timeRemaining --;
        }
          }
    }
