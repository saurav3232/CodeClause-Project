let startButton = document.getElementById("start");
let resetButton = document.getElementById("reset");
let timerHeading = document.getElementById("timer-heading");
let progressBar = document.querySelector(".progress-bar");
let saveTimer=document.getElementById("saveTimer");
let timerName=document.getElementById("timer-name");
let editedHours = ""; // Variable to store edited hours value
let editedMinutes = ""; // Variable to store edited minutes value
let editedSeconds = ""; // Variable to store edited seconds value
let timerSound = document.getElementById("timer-sound");

let countdown;
let isPaused = false; // flag to track if the timer is paused or not

function startTimer(duration, display) {
  let start = Date.now(),
    diff,
    hours,
    minutes,
    seconds;

  countdown = setInterval(function () {
    if (isPaused) {
      // if the timer is paused, do not update the timer and progress bar
      return;
    }

    diff = duration - (((Date.now() - start) / 1000) | 0);

    hours = (diff / 3600) | 0;
    minutes = ((diff % 3600) / 60) | 0;
    seconds = diff % 60 | 0;

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.textContent = hours + ":" + minutes + ":" + seconds;
    progressBar.style.width = (diff / duration) * 100 + "%";

   
    if (diff <= 0) {
      clearInterval(countdown);
      display.textContent = "Time's up!";
      playTimerSound(); // Play the timer sound when the timer is over
    }
  }, 1000);
}


function playTimerSound() {
  timerSound.loop = true;
  timerSound.play();
}


function resetTimerSound() {
  timerSound.pause();
  timerSound.currentTime = 0;
  timerSound.loop = false;
}

startButton.addEventListener("click", function () {
  if (!countdown) {
    // timer has not started yet
    let timeParts = timerHeading.innerHTML.split(":");
    let seconds=(parseInt(timeParts[0])*60*60)+(parseInt(timeParts[1])*60)+parseInt(timeParts[2]);
    console.log(seconds);
    startTimer(seconds, timerHeading);
    startButton.innerHTML = "Pause"; // update start button text to "Pause"
  } else {
    isPaused = !isPaused; // toggle the flag to pause/resume the timer
    startButton.innerHTML = isPaused ? "Resume" : "Pause"; // update start button text accordingly
  }
});

resetButton.addEventListener("click", function () {
  clearInterval(countdown);
  countdown = null;

  // Set the timer value to the edited values if available, otherwise set it to the original value
  let resetHours = editedHours !== "" ? editedHours : "00";
  let resetMinutes = editedMinutes !== "" ? editedMinutes : "02";
  let resetSeconds = editedSeconds !== "" ? editedSeconds : "00";

  timerHeading.textContent = resetHours + ":" + resetMinutes + ":" + resetSeconds;
  progressBar.style.width = "100%";
  startButton.innerHTML = "Start"; // Reset start button text to "Start"
  isPaused = false; // Reset the flag to false
  resetTimerSound(); 
});


saveTimer.addEventListener("click",()=>{
  let hr=document.getElementById("hrsFromEdit").value;
  let min=document.getElementById("minsFromEdit").value;
  let sec=document.getElementById("secFromEdit").value;
  let timerHead=document.getElementById("timerName").value;
  editedHours = document.getElementById("hrsFromEdit").value;
  editedMinutes = document.getElementById("minsFromEdit").value;
  editedSeconds = document.getElementById("secFromEdit").value;
  let oldName=document.getElementById("timer-name").innerHTML;
  if(timerHead==="") timerHead=oldName;
  let timermini=document.getElementById("timer-detail-mini").innerHTML;
  let modTimerMini=timermini.slice(1,-1);
  console.log(modTimerMini);
  const timeParts = modTimerMini.split(":");
  let newhr=hr===""?timeParts[0]:hr;
  let newMin=min===""?timeParts[1]:min;
  let newSec=sec===""?timeParts[2]:sec;
  let newTimer="("+newhr+":"+newMin+":"+newSec+")";
  document.getElementById("timer-heading").innerHTML=newhr+":"+newMin+":"+newSec;
  document.getElementById("timer-detail-mini").innerHTML=newTimer;
  // console.log(newTimer)
  document.getElementById("timer-name").innerHTML=timerHead;
})

