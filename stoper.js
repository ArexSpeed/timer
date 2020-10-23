let kind = ["Stoper", "Workout"];

class Stoper {
  constructor(names) {
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

    this.UiSelectors = {
      time: "[data-time]",
      stop: "[data-stop]",
      start: "[data-start]",
      plus: "[data-plus]",
      plusTime: "[data-plus-time]",
      reset: "[data-reset]",
      btnPrevKind: "[data-btn-prev-kind]",
      btnNextKind: "[data-btn-next-kind]",
      kindName: "[data-kind-name]",
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
      this.timerSection.style.display = "flex";
      this.workoutSection.style.display = "none";
    }
    if (this.currentKind == 1) {
      this.timerSection.style.display = "none";
      this.workoutSection.style.display = "flex";
      const workout = new Workout();
      workout.initializeWorkout();
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
        }</span>`;
      console.log(this.seconds);
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
    this.time.textContent = `0${this.hours}:0${this.minutes}:0${this.seconds}:0${this.miliseconds}`;
    this.plusTime.innerHTML = "";
  }

  plusLap() {
    console.log("PLUS");
    this.hours = this.hours;
    this.minutes = this.minutes;
    this.seconds = this.seconds;

    this.plusTime.innerHTML += `<br><div class="plus_time">${
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
