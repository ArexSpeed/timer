class Workout{
    constructor(){
        this.seriesInput = null;
        this.workoutInput = null;
        this.secondInput = null;
        this.restSeriesInput = null;
        this.restWorkoutInput = null;

        this.series = 0;
        this.workout = 0;
        this.seconds = 0;
        this.restSeries = 0;
        this.restWorkout = 0;

        this.UiSelectors = {
            series: '[data-series-input]',
            workout: '[data-workout-input]',
            seconds: '[data-seconds-input]',
            restSeries: '[data-restSeries-input]',
            restWorkout: '[data-restWorkout-input]',
            stop: '[data-stop]',
            start: '[data-start]'
        }
    }

    initializeWorkout(){
        this.seriesInput = document.querySelector(this.UiSelectors.series);
        this.workoutInput = document.querySelector(this.UiSelectors.workout);
        this.secondsInput = document.querySelector(this.UiSelectors.seconds);
        this.restSeriesInput = document.querySelector(this.UiSelectors.restSeries);
        this.restWorkoutInput = document.querySelector(this.UiSelectors.restWorkout);

        this.stopBtn = document.querySelector(this.UiSelectors.stop);
        this.startBtn = document.querySelector(this.UiSelectors.start);

        this.eventListeners();
    }

    eventListeners(){
        this.seriesInput.addEventListener('click',()=>{
            console.log("serie");
        });
        this.workoutInput.addEventListener('click',()=>{
            console.log("workout");
        });

        this.stopBtn.addEventListener('click', ()=> {
           this.stopWorkout();
        })
        this.startBtn.addEventListener('click', ()=> {
           this.startWorkout();
        })
    }

    startWorkout(){
        this.series = this.seriesInput.value;
        this.workout = this.workoutInput.value;
        this.seconds = this.secondsInput.value;

        this.restSeries = this.restSeriesInput.value;
        this.restWorkout = this.restWorkoutInput.value;
        
        this.setWorkout = this.workoutInput.value;
        this.setSeconds = this.secondsInput.value;
        this.setRestSeries = this.restSeriesInput.value;
        this.setRestWorkout = this.restWorkoutInput.value;

        this.countdown = setInterval(()=>{
            this.seconds--;
            if(this.seconds<0){
                this.seconds=0;
                    this.restWorkout--;
                    if(this.restWorkout<0){
                        this.seconds = this.setSeconds;
                        this.restWorkout = this.setRestWorkout;
                        this.workout--;
                    }
            }

            if(this.workout<0){
                this.workout = this.setWorkout;
                this.series--;
                this.seconds = this.restSeries;

            }

            if(this.series<0){
                this.stopWorkout();
            }
            this.displayTimeWorkout();
            console.log(`${this.series} : ${this.workout} : ${this.seconds} : ${this.restWorkout}`);
        },1000);

        console.log(`${this.series} : ${this.workout} : ${this.seconds}`)

    }

    displayTimeWorkout(){
        this.seriesInput.value = this.series>=10 ? this.series : this.series<=0 ? '00' : `0${this.series}`;
        this.workoutInput.value = this.workout>=10 ? this.workout : this.workout<=0 ? '00' : `0${this.workout}`;
        this.secondsInput.value = this.seconds>=10 ? this.seconds : this.seconds<=0 ? '00' : `0${this.seconds}`;

        this.restSeriesInput.value = this.restSeries;
        this.restWorkoutInput.value = this.restWorkout;
    }

    stopWorkout(){
        this.countdown = clearInterval(this.countdown);
        console.log("stop");
    }
}