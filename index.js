document.getElementById('mountainHills')?.classList.add('animate');
const [daysElem, hoursElem, minutesElem, secondsElem] = /** @type {Array<HTMLParagraphElement>} */ ([...document.querySelectorAll('.time-unit > :first-child')]);
const newYear = new Date(`January 1 ${new Date().getFullYear() + 1} 00:00:00`);

countdown();
setInterval(countdown, 1000);

function countdown() {
  const currentDate = new Date();
  const totalSeconds = (newYear.getTime() - currentDate.getTime()) / 1000;
  const days = Math.floor(totalSeconds / 3600 / 24);
  const hours = Math.floor(totalSeconds / 3600) % 24;
  const minutes = Math.floor(totalSeconds / 60) % 60;
  const seconds = Math.floor(totalSeconds) % 60;

  daysElem.textContent = days.toString();
  hoursElem.textContent = formatTime(hours);
  minutesElem.textContent = formatTime(minutes);
  secondsElem.textContent = formatTime(seconds);
}

/**
 * @param {number} time
 * @return {string}
 * */
function formatTime(time) {
  return time < 10 ? `0${time}` : time.toString();
}
