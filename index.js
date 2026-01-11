initialize();

function initialize() {
  document.getElementById('mountainHills')?.classList.add('animate');
  const [daysElem, hoursElem, minutesElem, secondsElem] = /** @type {Array<HTMLParagraphElement>} */ ([...document.querySelectorAll('.time-unit > :first-child')]);

  const countdown = () => {
    const newYear = getNextNewYear();
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
  };

  countdown();
  setInterval(countdown, 1000);
}

/**
 * @param {number} time
 * @return {string}
 * */
function formatTime(time) {
  return time < 10 ? `0${time}` : time.toString();
}

function getNextNewYear() {
  const currentYear = new Date().getFullYear();
  return new Date(`January 1 ${currentYear + 1} 00:00:00`);
}
