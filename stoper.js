let kind = ["Stoper", "Timer", "Workout"];

class Stoper {
  constructor() {
    this.hoursInput = null;
    this.startBtn = null;
    this.stopBtn = null;
    this.plusBtn = null;
    this.resetBtn = null;
    this.currentKind = 0;

    this.miliseconds = 0;
    this.seconds = 0;
    this.minutes = 0;
    this.hours = 0;
    this.countLap = 0;

    this.UiSelectors = {
      time: "[data-stoper-time]",
      stop: "[data-stoper-stop]",
      start: "[data-stoper-start]",
      plus: "[data-stoper-plus]",
      plusTime: "[data-stoper-plus-time]",
      reset: "[data-stoper-reset]",
      btnPrevKind: "[data-btn-prev-kind]",
      btnNextKind: "[data-btn-next-kind]",
      kindName: "[data-kind-name]",
      stoperSection: "[data-stoper]",
      timerSection: "[data-timer]",
      workoutSection: "[data-workout]"
    };
  }

  initializeStoper() {
    this.time = document.querySelector(this.UiSelectors.time);
    this.plusTime = document.querySelector(this.UiSelectors.plusTime);
    this.stopBtn = document.querySelector(this.UiSelectors.stop);
    this.startBtn = document.querySelector(this.UiSelectors.start);
    this.plusBtn = document.querySelector(this.UiSelectors.plus);
    this.resetBtn = document.querySelector(this.UiSelectors.reset);
    this.kindName = document.querySelector(this.UiSelectors.kindName);
    this.kindName.textContent = kind[this.currentKind];
    this.btnPrevKind = document.querySelector(this.UiSelectors.btnPrevKind);
    this.btnNextKind = document.querySelector(this.UiSelectors.btnNextKind);

    // Sections
    this.stoperSection = document.querySelector(this.UiSelectors.stoperSection);
    this.timerSection = document.querySelector(this.UiSelectors.timerSection);
    this.workoutSection = document.querySelector(
      this.UiSelectors.workoutSection
    );

    this.eventListeners();
  }

  eventListeners() {
    this.startBtn.addEventListener("click", () => this.startStoper());
    this.stopBtn.addEventListener("click", () => this.stopStoper());
    this.resetBtn.addEventListener("click", () => this.resetStoper());
    this.plusBtn.addEventListener("click", () => this.plusLap());

    //Change kind timer
    this.btnPrevKind.addEventListener("click", () => {
      this.changeKind(this.currentKind - 1);
      console.log("prevKind");
    });
    this.btnNextKind.addEventListener("click", () => {
      this.changeKind(this.currentKind + 1);
      console.log("nextKind");
    });
  }

  changeKind(index) {
    if (index === -1 || index === kind.length) return;
    this.currentKind = index;
    this.kindName.textContent = kind[index];
    //this.changeBox(this.currentKind)
    console.log("Kind" + index);

    if (this.currentKind == 0) {
      this.stoperSection.style.display = "flex";
      this.timerSection.style.display = "none";
      this.workoutSection.style.display = "none";
    }
    if (this.currentKind == 1) {
      this.stoperSection.style.display = "none";
      this.timerSection.style.display = "flex";
      this.workoutSection.style.display = "none";
      const timer = new Timer();
      timer.initializeTimer();
    }
  }

  startStoper() {
    this.stoper = setInterval(() => {
      this.miliseconds++;

      if (this.miliseconds == 100) {
        this.seconds++;
        this.miliseconds = 0;
      }
      if (this.seconds == 60) {
        this.minutes++;
        this.seconds = 0;
      }
      if (this.minutes == 60) {
        this.hours++;
        this.minutes = 0;
      }

      this.time.innerHTML = `${
        this.hours >= 10 ? this.hours : "0" + this.hours
      }:
        ${this.minutes >= 10 ? this.minutes : "0" + this.minutes}:
        <span class="sec">${
          this.seconds >= 10 ? this.seconds : "0" + this.seconds
        }</span>.
        <span class="milisec">${
          this.miliseconds >= 10 ? this.miliseconds : "0" + this.miliseconds
        }</span>`

        const displayStoperTime = `${
          this.hours >= 10 ? this.hours : "0" + this.hours
        }:
          ${this.minutes >= 10 ? this.minutes : "0" + this.minutes}:
         ${
            this.seconds >= 10 ? this.seconds : "0" + this.seconds
          }`
        document.title = displayStoperTime;
    }, 10);
  }

  stopStoper() {
    this.stoper = clearInterval(this.stoper);
  }
  resetStoper() {
    this.stopStoper();
    this.miliseconds = 0;
    this.seconds = 0;
    this.minutes = 0;
    this.hours = 0;
    this.countLap = 0;
    this.time.textContent = `0${this.hours}:0${this.minutes}:0${this.seconds}:0${this.miliseconds}`;
    this.plusTime.innerHTML = "";
  }

  plusLap() {
    console.log("PLUS");
    this.hours = this.hours;
    this.minutes = this.minutes;
    this.seconds = this.seconds;
    this.countLap++;
    this.plusTime.innerHTML += `<br><div class="lap">
    <span class="milisec">${this.countLap})</span>
    ${
      this.hours >= 10 ? this.hours : "0" + this.hours
    }:
    ${this.minutes >= 10 ? this.minutes : "0" + this.minutes}:
    <span class="sec">${
      this.seconds >= 10 ? this.seconds : "0" + this.seconds
    }</span>.
    <span class="milisec">${
      this.miliseconds >= 10 ? this.miliseconds : "0" + this.miliseconds
    }</span>
    </div>`;
  }
}

class Timer {
  constructor() {
    this.hoursInput = null;
    this.minutesInput = null;
    this.secondsInput = null;
    this.timerInputs = null;
    this.setminBtn = null;
    this.startBtn = null;
    this.stopBtn = null;
    this.addminBtn = null;

    this.hours = 0;
    this.minutes = 0;
    this.seconds = 0;
    this.totalTime = 0;
    this.currentTime = 0;
    this.maxSeconds = 60;
    this.maxMinutes = 60;
    this.maxHours = 99;
    this.maxTime =
      this.maxHours * 3600 + (this.maxMinutes - 1) * 60 + (this.maxSeconds - 1);

    this.UiSelectors = {
      minutes: "minutes",
      seconds: "seconds",
      setmin: "[data-setmin]",
      stop: "[data-stop]",
      start: "[data-start]",
      timerInput: "[data-timer-input]",
      addmin: "[data-addmin]"
    };
  }

  initializeTimer() {
    this.minutesInput = document.getElementById(this.UiSelectors.minutes);
    this.secondsInput = document.getElementById(this.UiSelectors.seconds);

    this.stopBtn = document.querySelector(this.UiSelectors.stop);
    this.startBtn = document.querySelector(this.UiSelectors.start);
    this.timerInputs = document.querySelectorAll(this.UiSelectors.timerInput);
    this.setminBtns = document.querySelectorAll(this.UiSelectors.setmin);
    this.addminBtn = document.querySelector(this.UiSelectors.addmin);

    this.eventListeners();
  }

  eventListeners() {
    [...this.setminBtns].forEach(btn => {
      btn.addEventListener("click", () => {
        console.log("work");
        console.log(btn.value);
        this.stopTimer();
        this.setTimer(btn.value * 60);
      });
    });

    this.addminBtn.addEventListener("click", () => {
      this.stopTimer();
      this.setTimer(this.setTime() + this.addminBtn.value * 60);
    });

    this.stopBtn.addEventListener("click", () => {
      this.stopTimer();
      console.log("stop");
    });
    this.startBtn.addEventListener("click", () => {
      //stopTimer in every click cause should clean doubleclick
      this.stopTimer();
      this.setTimer(this.setTime());
    });

    //StopTimer on Inputs
    this.minutesInput.addEventListener("click", () => {
      this.stopTimer();
    });
    this.secondsInput.addEventListener("click", () => {
      this.stopTimer();
    });

    //Set Timer on inputs
    this.minutesInput.addEventListener("change", () => {
      this.setTimer(this.setTime());
      console.log("M : " + this.minutesInput.value);
    });
    this.secondsInput.addEventListener("change", () => {
      this.setTimer(this.setTime());
      console.log("S : " + this.secondsInput.value);
    });

  }

  //this.setTime() variable form reading setTimer()
  setTime() {
    return (
      Number(this.minutesInput.value * 60) + Number(this.secondsInput.value)
    );
  }

  setTimer(secs) {
    this.now = Date.now();
    this.then = this.now + secs * 1000;
    this.displayTimeLeft(secs);

    this.countdown = setInterval(() => {
      const secondsLeft = Math.round((this.then - Date.now()) / 1000);

      if (secondsLeft < 0) {
        clearInterval(this.countdown);
      }
      this.displayTimeLeft(secondsLeft);
    }, 1000);
  }

  displayTimeLeft(secs) {
    const mins = Math.floor(secs / 60);
    const restSecs = secs % 60;
    const display = `${mins < 10 ? "0" + mins : mins}:${
      restSecs < 10 ? "0" : ""
    }${restSecs}`;
    document.title = display;
    this.minutesInput.value = `${
      mins >= 10 ? mins : mins <= 0 ? "00" : "0" + mins
    }`;
    this.secondsInput.value = `${
      restSecs >= 10 ? restSecs : restSecs <= 0 ? "00" : "0" + restSecs
    }`;
    console.log(mins);
    console.log(secs);
  }

  stopTimer() {
    this.countdown = clearInterval(this.countdown);
  }

}


// Workout

class Workout {
  constructor() {
    this.seriesInput = null;
    this.workoutInput = null;
    this.secondsInput = null;
    this.restSeriesInput = null;
    this.restWorkoutInput = null;
    this.resetWorkoutBtn = null;

    this.series = 0;
    this.workout = 0;
    this.seconds = 0;
    this.restSeries = 0;
    this.restWorkout = 0;

    this.UiSelectors = {
      series: "[data-series-input]",
      workout: "[data-workout-input]",
      seconds: "[data-seconds-input]",
      restSeries: "[data-restSeries-input]",
      restWorkout: "[data-restWorkout-input]",
      stop: "[data-stop-workout]",
      start: "[data-start-workout]",
      reset: "[data-reset-workout]"
    };
  }
  initializeWorkout() {
    this.seriesInput = document.querySelector(this.UiSelectors.series);
    this.workoutInput = document.querySelector(this.UiSelectors.workout);
    this.secondsInput = document.querySelector(this.UiSelectors.seconds);
    this.restSeriesInput = document.querySelector(this.UiSelectors.restSeries);
    this.restWorkoutInput = document.querySelector(
      this.UiSelectors.restWorkout
    );

    this.stopBtn = document.querySelector(this.UiSelectors.stop);
    this.startBtn = document.querySelector(this.UiSelectors.start);
    this.resetBtn = document.querySelector(this.UiSelectors.reset);

    //Array for reset value on start
    this.valueInput = [this.secondsInput, this.workoutInput, this.seriesInput];
    this.eventListenersWO();
  }

  eventListenersWO() {
    this.stopBtn.addEventListener("click", () => {
      this.stopWorkout();
    });
    this.startBtn.addEventListener("click", () => {
      this.startWorkout();
    });
    this.resetBtn.addEventListener("click", () => {
      this.stopWorkout();
      this.seconds = 0;
      this.workout = 0;
      this.series = 0;
      this.displayWorkout();
    });

    this.secondsInput.addEventListener("click", () => {
      this.secondsInput.value = "";
    });
    this.workoutInput.addEventListener("click", () => {
      this.workoutInput.value = "";
    });
    this.seriesInput.addEventListener("click", () => {
      this.seriesInput.value = "";
    });
    this.restWorkoutInput.addEventListener("click", () => {
      this.restWorkoutInput.value = "";
    });
    this.restSeriesInput.addEventListener("click", () => {
      this.restSeriesInput.value = "";
    });
  }

  startWorkout() {
    this.series = 1;
    this.workout = 1;
    this.seconds = 0;

    this.restSeries = 0;
    this.restWorkout = 0;

    //Set values
    this.setSeries = this.seriesInput.value;
    this.setWorkout = this.workoutInput.value;
    this.setSeconds = this.secondsInput.value;

    this.setRestSeries = this.restSeriesInput.value;
    this.setRestWorkout = this.restWorkoutInput.value;

    this.setSeconds =
      this.setSeconds == 0 ? (this.setSeconds = 59) : this.setSeconds;
    console.log(this.setSeconds);

    this.stoper = setInterval(() => {
      this.seconds++;
      if (this.seconds > this.setSeconds) {
        this.seconds = this.setSeconds;
        this.restWorkout++;
        if (this.restWorkout > this.setRestWorkout) {
          this.workout++;
          this.seconds = 0;
          this.restWorkout = 0;
        }
        if (this.workout > this.setWorkout) {
          this.workout = this.setWorkout;
          this.restSeries++;
          this.seconds = this.setSeconds;
          this.restWorkout = this.setRestWorkout;
          if (this.restSeries > this.setRestSeries) {
            this.series++;
            this.workout = 1;
            this.restSeries = 0;
          }
        }
      }

      if (this.series > this.setSeries) {
        this.stopWorkout();
      }
      this.displayWorkout();
    }, 1000);
  }

  displayWorkout() {
    this.seriesInput.value =
      this.series >= 10
        ? this.series
        : this.series <= 0
        ? "00"
        : `0${this.series}`;
    this.workoutInput.value =
      this.workout >= 10
        ? this.workout
        : this.workout <= 0
        ? "00"
        : `0${this.workout}`;
    this.secondsInput.value =
      this.seconds >= 10
        ? this.seconds
        : this.seconds <= 0
        ? "00"
        : `0${this.seconds}`;

    this.restSeriesInput.value = this.restSeries;
    this.restWorkoutInput.value = this.restWorkout;
  }

  stopWorkout() {
    this.stoper = clearInterval(this.stoper);
    console.log("stop");
  }
}
