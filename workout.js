let kind = ["Workout", "Workout countdown"];
// Workout

class Workout {
  constructor() {
    this.seriesInput = null;
    this.workoutInput = null;
    this.secondsInput = null;
    this.restSeriesInput = null;
    this.restWorkoutInput = null;
    this.resetWorkoutBtn = null;
    this.currentKind = 0;

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
      reset: "[data-reset-workout]",
      btnPrevKind: "[data-btn-prev-kind]",
      btnNextKind: "[data-btn-next-kind]",
      kindName: "[data-kind-name]",
      workoutSection: "[data-workout]",
      workoutDownSection: "[data-workout-down]",
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
    this.kindName = document.querySelector(this.UiSelectors.kindName);
    this.kindName.textContent = kind[this.currentKind];
    this.btnPrevKind = document.querySelector(this.UiSelectors.btnPrevKind);
    this.btnNextKind = document.querySelector(this.UiSelectors.btnNextKind);

    this.stopBtn = document.querySelector(this.UiSelectors.stop);
    this.startBtn = document.querySelector(this.UiSelectors.start);
    this.resetBtn = document.querySelector(this.UiSelectors.reset);

    // Sections
    this.workoutSection = document.querySelector(this.UiSelectors.workoutSection);
    this.workoutDownSection = document.querySelector(this.UiSelectors.workoutDownSection);

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

        //Change kind timer
        this.btnPrevKind.addEventListener("click", () => {
          if(this.currentKind === 0){
            this.changeKind(kind.length-1)
          }else{
            this.changeKind(this.currentKind - 1);
          }
        });
        this.btnNextKind.addEventListener("click", () => {
          if(this.currentKind === kind.length-1){
            this.changeKind(0)
          }else{
            this.changeKind(this.currentKind + 1);
          }
        });
  }


  changeKind(index) {
    if (index === -1 || index === kind.length) return;
    this.currentKind = index;
    this.kindName.textContent = kind[index];
    //this.changeBox(this.currentKind)
    console.log("Kind" + index);

    if (this.currentKind == 0) {
      this.workoutSection.style.display = "flex";
      this.workoutDownSection.style.display = "none";
    }
    if (this.currentKind == 1) {
      this.workoutSection.style.display = "none";
      this.workoutDownSection.style.display = "flex";
      const workoutDown = new WorkoutDown();
      workoutDown.initializeWorkoutDown();
    }
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


class WorkoutDown {
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
      series: "[data-series-input-down]",
      workout: "[data-workout-input-down]",
      seconds: "[data-seconds-input-down]",
      restSeries: "[data-restSeries-input-down]",
      restWorkout: "[data-restWorkout-input-down]",
      stop: "[data-stop-workout-down]",
      start: "[data-start-workout-down]",
      reset: "[data-reset-workout-down]"
    };
  }

  initializeWorkoutDown() {
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
