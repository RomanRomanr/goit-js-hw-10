import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
const btn = document.querySelector('button');
const input = document.querySelector('#datetime-picker');
const timer = document.querySelector('.timer');

const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');
btn.disabled = true;

let userSelectedDate = 0;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    const userDate = selectedDates[0];
    const currentDate = Date.now();
    if (userDate.getTime() <= currentDate) {
      iziToast.show({
        color: 'red',
        message: 'Please choose a date in the future',
        position: 'topRight',
      });
      return;
    } 
    else {
      userSelectedDate = userDate;
      btn.disabled = false;
    }
    }, 
};
flatpickr(input, options);
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

let timerId = null;
btn.addEventListener('click', () => {
  btn.disabled = true;
  input.disabled = true;
  timerId = setInterval(() => {
    const currentTime = Date.now();
    const dTime = userSelectedDate.getTime() - currentTime;
    if (dTime <= 0) {
      clearInterval(timerId);
      updateTimer({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      input.disabled = false;
      return;
    }
    const time = convertMs(dTime);
    updateTimer(time);
  }, 1000)
  
});
function updateTimer({ days, hours, minutes, seconds }) {
  daysEl.textContent = addLeadingZero(days);
  hoursEl.textContent = addLeadingZero(hours);
  minutesEl.textContent = addLeadingZero(minutes);
  secondsEl.textContent = addLeadingZero(seconds);
}
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
