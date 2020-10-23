let kind = ["Minutes", "Workout"];
class Timer {
  constructor() {
    this.hoursInput = null;
    this.minutesInput = null;
    this.secondsInput = null;
    this.timerInputs = null;
    this.setminBtn = null;
    this.startBtn = null;
    this.stopBtn = null;
    this.currentKind = 0;
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
      btnPrevKind: "[data-btn-prev-kind]",
      btnNextKind: "[data-btn-next-kind]",
      kindName: "[data-kind-name]",
      timerSection: "[data-timer]",
      workoutSection: "[data-workout]",
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
    [...this.setminBtns].forEach(btn => {
      btn.addEventListener("click", () => {
        console.log("work");
        console.log(btn.value);
        this.stopTimer();
        this.setTimer(btn.value * 60);
      });
    });
    /* old version for all btn inputs divides (new is foreach)
        this.rerunBtn.addEventListener('click', ()=> {
            this.stopTimer();
            this.setTimer(this.rerunBtn.value*60)
        } );
        */
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

  setWorkout() {}
}

class Workout {
  constructor() {
    this.seriesInput = null;
    this.workoutInput = null;
    this.secondInput = null;
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

    this.eventListenersWO();
  }

  eventListenersWO() {
    this.seriesInput.addEventListener("click", () => {
      console.log("serie");
    });
    this.workoutInput.addEventListener("click", () => {
      console.log("workout");
    });

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
      this.displayTimeWorkout();
    });
  }

  startWorkout() {
    this.series = this.seriesInput.value;
    this.workout = this.workoutInput.value;
    this.seconds = this.secondsInput.value;

    this.restSeries = this.restSeriesInput.value;
    this.restWorkout = this.restWorkoutInput.value;

    this.setWorkout = this.workoutInput.value;
    this.setSeconds = this.secondsInput.value;
    this.setRestSeries = this.restSeriesInput.value;
    this.setRestWorkout = this.restWorkoutInput.value;

    this.countdown = setInterval(() => {
      this.seconds--;
      if (this.seconds < 0) {
        this.seconds = 0;
        this.restWorkout--;
        if (this.restWorkout < 0) {
          this.seconds = this.setSeconds;
          this.restWorkout = this.setRestWorkout;
          this.workout--;
        }
      }

      if (this.workout < 0) {
        this.restSeries--;
        this.seconds = 0;
        this.restWorkout = this.setRestWorkout;
        if (this.restSeries < 0) {
          this.seconds = this.setSeconds;
          this.workout = this.setWorkout;
          this.series--;
          this.restSeries = this.setRestSeries;
        }
      } 

      if (this.series < 0) {
        this.stopWorkout();
      }
      this.displayTimeWorkout();
      console.log(
        `${this.series} : ${this.workout} : ${this.seconds} : ${this.restWorkout}`
      );
    }, 1000);

    console.log(`${this.series} : ${this.workout} : ${this.seconds}`);
  }

  displayTimeWorkout() {
    this.seriesInput.value =
      this.series >= 10
        ? this.series
        : this.series <= 0
        ? "00"
        : `${this.series}`;
    this.workoutInput.value =
      this.workout >= 10
        ? this.workout
        : this.workout <= 0
        ? "00"
        : `${this.workout}`;
    this.secondsInput.value =
      this.seconds >= 10
        ? this.seconds
        : this.seconds <= 0
        ? "00"
        : `${this.seconds}`;

    this.restSeriesInput.value = this.restSeries;
    this.restWorkoutInput.value = this.restWorkout;
  }

  stopWorkout() {
    this.countdown = clearInterval(this.countdown);
    console.log("stop");
  }
}
