import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const delay = form.elements.delay;
const state = form.elements.state;
form.addEventListener('submit', e => {
    e.preventDefault();
    const delayValue = Number(delay.value);
    let chooseState;
    for (let i = 0; i < state.length; i++) {
        if (state[i].checked) {
            chooseState = state[i].value;
            break;
        }
    }
    if (!chooseState) {
        iziToast.error({
            message: 'Please select a state',
            position: 'topRight',
        });
        return;
    }
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (chooseState === 'fulfilled') {
          resolve(delayValue); 
        } else {
          reject(delayValue); 
        }
      }, delayValue);
    });

    
    promise
      .then(delay => {
        iziToast.success({
          message: `Fulfilled promise in ${delay}ms`,
          position: 'topRight',
        });
      })
      .catch(delay => {
        iziToast.error({
          message: `Rejected promise in ${delay}ms`,
          position: 'topRight',
        });
      });

    form.reset();
});