const refs = {
  days: document.querySelector('[data-value="days"]'),
  hours: document.querySelector('[data-value="hours"]'),
  mins: document.querySelector('[data-value="mins"]'),
  secs: document.querySelector('[data-value="secs"]'),
};



class CountdownTimer {
  constructor({ selector, targetDate, onTimerFace }) {
    this.selector = selector;
    this.targetDate = targetDate;
    this.onTimerFace = onTimerFace;
  }

  activationTimer() {
    const currentTime = Date.now();
    const deltaTime = this.targetDate - currentTime;
    // console.log(deltaTime);
    const time = this.getTimeComponents(deltaTime);
    this.onTimerFace(time);
    // console.log(this.targetDate);
    // console.log(deltaTime);
  };

  start() {
    this.activationTimer();
    setInterval(() => {this.activationTimer()}, 1000);
  }

  /*
   * - Принимает время в миллисекундах
   * - Высчитывает сколько в них вмещается дней/часов/минут/секунд
   * - Возвращает обьект со свойствами days, hours, mins, secs
   */

  getTimeComponents(time) {
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    );
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

    return { days, hours, mins, secs };
  }

  /*
   * Принимает число, приводит к строке и добавляет в начало 0 если число меньше 2-х знаков
   */
  pad(value) {
    return String(value).padStart(2, '0');
  }
}
 
/*
 - Принимает время (деструктуризированные данные)
 - Рисует интерфейс
 - Внешняя ф-ция, которая передается как св-во в экземпляр
*/
function addInerface({ days, hours, mins, secs }) {
  refs.days.textContent = days;
  refs.hours.textContent = hours;
  refs.mins.textContent = mins;
  refs.secs.textContent = secs;
}

const timerProject = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Jun 16, 2021'),
  onTimerFace: addInerface,
});


timerProject.start();

// console.log(timerProject);


// const targetDate = new Date('Jun 16, 2021');
// console.log(targetDate);


// new CountdownTimer({
//   selector: '#timer-1',
//   targetDate: new Date('Jul 17, 2019'),
// });

/*
 * Оставшиеся дни: делим значение UTC на 1000 * 60 * 60 * 24, количество
 * миллисекунд в одном дне (миллисекунды * секунды * минуты * часы)
 */
// const days = Math.floor(time / (1000 * 60 * 60 * 24));

/*
 * Оставшиеся часы: получаем остаток от предыдущего расчета с помощью оператора
 * остатка % и делим его на количество миллисекунд в одном часе
 * (1000 * 60 * 60 = миллисекунды * минуты * секунды)
 */
// const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

/*
 * Оставшиеся минуты: получаем оставшиеся минуты и делим их на количество
 * миллисекунд в одной минуте (1000 * 60 = миллисекунды * секунды)
 */
// const mins = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));

/*
 * Оставшиеся секунды: получаем оставшиеся секунды и делим их на количество
 * миллисекунд в одной секунде (1000)
 */
// const secs = Math.floor((time % (1000 * 60)) / 1000);