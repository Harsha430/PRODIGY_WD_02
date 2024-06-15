let timerInterval;
let startTime;
let elapsedTime = 0;
const timerDisplay = document.querySelector(".timer");

function startTimer() {
  if (!timerInterval) {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(updateTimer, 10);
  }
}
function stopTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
}
function resetTimer() {
  stopTimer();
  elapsedTime = 0;
  updateTimerDisplay();
}
function updateTimer() {
  const currentTime = Date.now();
  elapsedTime = currentTime - startTime;
  updateTimerDisplay();
}
function updateTimerDisplay() {
  const milliseconds = elapsedTime % 1000;
  const seconds = Math.floor((elapsedTime / 1000) % 60);
  const minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
  const hours = Math.floor((elapsedTime / (1000 * 60 * 60)) % 24);
  const formattedTime = `${pad(hours)} : ${pad(minutes)} : ${pad(
    seconds
  )} : ${pad(milliseconds, 3)}`;
  timerDisplay.textContent = formattedTime;
}
function pad(num, size = 2) {
  let numString = num.toString();
  while (numString.length < size) {
    numString = "0" + numString;
  }
  return numString;
}
document.querySelector(".strt").addEventListener("click", startTimer);
document.querySelector(".stop").addEventListener("click", stopTimer);
document.querySelector(".reset").addEventListener("click", resetTimer);

const lapDisplay = document.querySelector(".lap-display");

function lapTimer() {
  if (timerInterval) {
    const lapTime = timerDisplay.textContent;
    const lapEntry = document.createElement("div");
    lapEntry.textContent = lapTime;
    lapDisplay.appendChild(lapEntry);
    if (lapDisplay.scrollHeight > lapDisplay.clientHeight) {
      lapDisplay.classList.add("scroll");
    }
  }
}
function clearLapDisplay() {
  lapDisplay.innerHTML = "";
  lapDisplay.classList.remove("scroll");
}
document.querySelector(".lap").addEventListener("click", lapTimer);
function resetTimer() {
  stopTimer();
  elapsedTime = 0;
  updateTimerDisplay();
  clearLapDisplay();
}
