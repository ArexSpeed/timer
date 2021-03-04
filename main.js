let cities = [{
        city: 'Honolulu',
        time: -11
    },
    {
        city: 'Anchorage',
        time: -10
    },
    {
        city: 'Los Angeles',
        time: -9
    },
    {
        city: 'Phoenix',
        time: -8
    },
    {
        city: 'Chicago',
        time: -7
    },
    {
        city: 'New York',
        time: -6
    },
    {
        city: 'Caracas',
        time: -5
    },
    {
        city: 'Sao Paulo',
        time: -4
    },
    {
        city: 'Azores',
        time: -2
    },
    {
        city: 'London',
        time: -1
    },
    {
        city: 'Warsaw',
        time: 0
    },
    {
        city: 'Cairo',
        time: 1
    },
    {
        city: 'Moscow',
        time: 2
    },
    {
        city: 'Dubai',
        time: 3
    },
    {
        city: 'Karachi',
        time: 4
    },
    {
        city: 'Dhaka',
        time: 5
    },
    {
        city: 'Jakarta',
        time: 6
    },
    {
        city: 'Shanghai',
        time: 7
    },
    {
        city: 'Tokyo',
        time: 8
    },
    {
        city: 'Adelaide',
        time: 9
    }
]

let kind = ["Digital", 'Analog', "Binary"];

class Slider{
    constructor(names){
        this.names = names; //city name or clock kind name
        this.slide = null;
        this.prevBtn = null;
        this.nextBtn = null;
        this.name = null;
        this.currentCity = 10;
        this.slideArrayLength = 0;
        this.slideCaption = null;
        this.timeIndex = 0;
        this.currentKind = 0;
    
        

    this.UiSelectors = {
        cityName: '[data-city-name]',
        btnPrevCity: '[data-btn-prev-city]',
        btnNextCity: '[data-btn-next-city]',
        timeBox: '[data-time]',
        btnPrevKind: '[data-btn-prev-kind]',
        btnNextKind: '[data-btn-next-kind]',
        kindName: '[data-kind-name]',
        //hand for analog
        analogClock: '[data-analog]',
        hourHand: '[data-hour-hand]',
        minuteHand: '[data-minute-hand]',
        secondHand: '[data-second-hand]',
        //binaryClock
        binaryClock: '[data-binary]'
    }

}

initializeSlider(){
    this.cityName = document.querySelector(this.UiSelectors.cityName);
    this.btnPrevCity = document.querySelector(this.UiSelectors.btnPrevCity);
    this.btnNextCity = document.querySelector(this.UiSelectors.btnNextCity);
    this.time = document.querySelector(this.UiSelectors.timeBox);
    this.cityName.textContent = cities[this.currentCity].city;
    // this.time.textContent = this.currentTime();
    // window.setInterval(this.time.textContent,1000);
    window.setInterval(()=>this.changeHour(this.timeIndex),1000);
    this.kindName = document.querySelector(this.UiSelectors.kindName);
    this.btnPrevKind = document.querySelector(this.UiSelectors.btnPrevKind);
    this.btnNextKind = document.querySelector(this.UiSelectors.btnNextKind);
    //analog hand
    this.hourHand = document.querySelector(this.UiSelectors.hourHand);
    this.minuteHand = document.querySelector(this.UiSelectors.minuteHand);
    this.secondHand = document.querySelector(this.UiSelectors.secondHand);
    this.analogClock = document.querySelector(this.UiSelectors.analogClock);
    //setInterval(this.setAnalog(this.timeIndex), 1000);
    //window.setInterval(()=>this.setAnalog(this.timeIndex),1000);

    //Binary Clock
    this.binaryClock = document.querySelector(this.UiSelectors.binaryClock);

    this.addListener();
}

addListener(){
    //change city
    this.btnPrevCity.addEventListener('click', ()=> {
        if(this.currentCity!==0){
            this.changeCity(this.currentCity-1);
        }
        else{
            this.changeCity(cities.length-1)
        }
        
    });
    this.btnNextCity.addEventListener('click', ()=>{ 
        if(this.currentCity!==cities.length-1){
            this.changeCity(this.currentCity+1);
        }
        else{
            this.changeCity(0)
        }
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

changeCity(index){
        if(index===-1 || index === cities.length) return;
        this.currentCity = index;
        this.cityName.textContent = cities[index].city;
        this.timeIndex = cities[index].time;
        this.changeHour(this.timeIndex);

}
 changeHour(index){
     if(index){
        const today = new Date();
        this.hour = today.getHours() + index;
        this.minute = today.getMinutes();
        this.second = today.getSeconds();
        this.setHour(this.hour,this.minute,this.second);
        //this.time.textContent = `${this.hour} : ${this.minute} : ${this.second}`;
        //console.log(this.hour + " " + this.minute);
     }
     else{
        const today = new Date();
        this.hour = today.getHours();
        this.minute = today.getMinutes();
        this.second = today.getSeconds();
        this.setHour(this.hour,this.minute,this.second);
        //this.time.textContent = `${this.hour} : ${this.minute} : ${this.second}`;
     }
    console.log(index);
}
setHour(){
    this.hour = this.hour>23 ? this.hour-24 : this.hour;
    this.hour = this.hour<0 ? this.hour+24 : this.hour;
    this.hour = this.hour<10 ? `0${this.hour}` : this.hour;
    this.minute = this.minute<10 ? `0${this.minute}` : this.minute;
    this.second = this.second<10 ? `0${this.second}` : this.second;
    document.title = `${this.hour}:${this.minute}:${this.second}`
    //for digital
    if(this.currentKind===0){
        this.time.style.display="block";
        this.analogClock.style.display="none";
        this.binaryClock.style.display = "none";
        this.time.textContent = `${this.hour} : ${this.minute} : ${this.second}`;
    }
    //for analog
   if(this.currentKind===1){
        this.setAnalog(this.timeIndex);
        //interval wywowule sie w funkcji changeTime i z tego jest pobierany timeIndex
   }
   //for binary
   if(this.currentKind===2){
       this.setBinary(this.timeIndex);      
   }
}

currentTime(){
    const today = new Date();
    this.hour = today.getHours();
    this.minute = today.getMinutes();
    this.second = today.getSeconds();
    
    this.time.textContent = `${this.hour} : ${this.minute} : ${this.second}`;
    
}

changeKind(index){
    
    if(index===-1 || index === kind.length) return;
        this.currentKind = index;
        this.kindName.textContent = kind[index];
        //this.changeBox(this.currentKind)
    console.log("Kind" + index)
}

//set Analog clock
setAnalog(index){
    console.log("Analog index:" +index);
    this.time.style.display = 'none';
    this.analogClock.style.display = "block";
    this.binaryClock.style.display = "none";
    const currentDate = new Date()
  const secondsRatio = currentDate.getSeconds() / 60
  const minutesRatio = (secondsRatio + currentDate.getMinutes()) / 60
  const hoursRatio = (minutesRatio + currentDate.getHours()+index) / 12
  this.setRotation(this.secondHand, secondsRatio)
  this.setRotation(this.minuteHand, minutesRatio)
  this.setRotation(this.hourHand, hoursRatio)
}
setRotation(element, rotationRatio) {
    element.style.setProperty('--rotation', rotationRatio * 360)
  }

  //set BinaryClock
  setBinary(index){
    this.time.style.display = 'none';
    this.analogClock.style.display = "none";
    this.binaryClock.style.display = "flex";
    //this.binaryClockDigit.style.
    let date = new Date();
      let hours = date.getHours() + index;
      let minutes = date.getMinutes();
      let seconds = date.getSeconds();
      hours = hours>24 ? hours-24 : hours;
      hours = hours<0 ? hours+24 : hours;

      
  
      let s2 = seconds % 10;
      let s1 = (seconds - s2) / 10 % 10;
      let m2 = minutes % 10;
      let m1 = (minutes - m2) / 10 % 10;
      let h2 = hours % 10;
      let h1 = (hours - h2) / 10 % 10;
      
  
      this.lighting(s2, 's2');
      this.lighting(s1, 's1');
      this.lighting(m2, 'm2');
      this.lighting(m1, 'm1');
      this.lighting(h2, 'h2');
      this.lighting(h1, 'h1');

      this.selectors('.hour-h1').textContent = h1;
      this.selectors('.hour-h2').textContent = h2;
      this.selectors('.minute-m1').textContent = m1;
      this.selectors('.minute-m2').textContent = m2;
      this.selectors('.second-s1').textContent = s1;
      this.selectors('.second-s2').textContent = s2;
  }

  selectors(el){
    return document.querySelector(el);
}

  lighting(n,t){
    if(n==1){
        this.selectors(`.${t}-1`).classList.add('on');
        this.selectors(`.${t}-1`).classList.remove('off');
        this.selectors(`.${t}-2`).classList.add('off')
        this.selectors(`.${t}-2`).classList.remove('on');
        this.selectors(`.${t}-4`).classList.add('off')
        this.selectors(`.${t}-4`).classList.remove('on');
        this.selectors(`.${t}-8`).classList.add('off')
        this.selectors(`.${t}-8`).classList.remove('on');
    }else if(n==2){
        this.selectors(`.${t}-1`).classList.add('off')
        this.selectors(`.${t}-1`).classList.remove('on');
        this.selectors(`.${t}-2`).classList.add('on')
        this.selectors(`.${t}-2`).classList.remove('off');
        this.selectors(`.${t}-4`).classList.add('off')
        this.selectors(`.${t}-4`).classList.remove('on');
        this.selectors(`.${t}-8`).classList.add('off')
        this.selectors(`.${t}-8`).classList.remove('on');
    }
    else if(n==3){
        this.selectors(`.${t}-1`).classList.add('on')
        this.selectors(`.${t}-1`).classList.remove('off');
        this.selectors(`.${t}-2`).classList.add('on')
        this.selectors(`.${t}-2`).classList.remove('off');
        this.selectors(`.${t}-4`).classList.add('off')
        this.selectors(`.${t}-4`).classList.remove('on');
        this.selectors(`.${t}-8`).classList.add('off')
        this.selectors(`.${t}-8`).classList.remove('on');
    }
    else if(n==4){
        this.selectors(`.${t}-1`).classList.add('off')
        this.selectors(`.${t}-1`).classList.remove('on');
        this.selectors(`.${t}-2`).classList.add('off')
        this.selectors(`.${t}-2`).classList.remove('on');
        this.selectors(`.${t}-4`).classList.add('on')
        this.selectors(`.${t}-4`).classList.remove('off');
        this.selectors(`.${t}-8`).classList.add('off')
        this.selectors(`.${t}-8`).classList.remove('on');
    }
    else if(n==5){
        this.selectors(`.${t}-1`).classList.add('on')
        this.selectors(`.${t}-1`).classList.remove('off');
        this.selectors(`.${t}-2`).classList.add('off')
        this.selectors(`.${t}-2`).classList.remove('on');
        this.selectors(`.${t}-4`).classList.add('on')
        this.selectors(`.${t}-4`).classList.remove('off');
        this.selectors(`.${t}-8`).classList.add('off')
        this.selectors(`.${t}-8`).classList.remove('on');
    }
    else if(n==6){
        this.selectors(`.${t}-1`).classList.add('off')
        this.selectors(`.${t}-1`).classList.remove('on');
        this.selectors(`.${t}-2`).classList.add('on')
        this.selectors(`.${t}-2`).classList.remove('off');
        this.selectors(`.${t}-4`).classList.add('on')
        this.selectors(`.${t}-4`).classList.remove('off');
        this.selectors(`.${t}-8`).classList.add('off')
        this.selectors(`.${t}-8`).classList.remove('on');
    }
    else if(n==7){
        this.selectors(`.${t}-1`).classList.add('on')
        this.selectors(`.${t}-1`).classList.remove('off');
        this.selectors(`.${t}-2`).classList.add('on')
        this.selectors(`.${t}-2`).classList.remove('off');
        this.selectors(`.${t}-4`).classList.add('on')
        this.selectors(`.${t}-4`).classList.remove('off');
        this.selectors(`.${t}-8`).classList.add('off')
        this.selectors(`.${t}-8`).classList.remove('on');
    }
    else if(n==8){
        this.selectors(`.${t}-1`).classList.add('off')
        this.selectors(`.${t}-1`).classList.remove('on');
        this.selectors(`.${t}-2`).classList.add('off')
        this.selectors(`.${t}-2`).classList.remove('on');
        this.selectors(`.${t}-4`).classList.add('off')
        this.selectors(`.${t}-4`).classList.remove('on');
        this.selectors(`.${t}-8`).classList.add('on')
        this.selectors(`.${t}-8`).classList.remove('off');
    }
    else if(n==9){
        this.selectors(`.${t}-1`).classList.add('on')
        this.selectors(`.${t}-1`).classList.remove('off');
        this.selectors(`.${t}-2`).classList.add('off')
        this.selectors(`.${t}-2`).classList.remove('on');
        this.selectors(`.${t}-4`).classList.add('off')
        this.selectors(`.${t}-4`).classList.remove('on');
        this.selectors(`.${t}-8`).classList.add('on')
        this.selectors(`.${t}-8`).classList.remove('off');
    }
    else if(n==0){
        this.selectors(`.${t}-1`).classList.add('off')
        this.selectors(`.${t}-1`).classList.remove('on');
        this.selectors(`.${t}-2`).classList.add('off')
        this.selectors(`.${t}-2`).classList.remove('on');
        this.selectors(`.${t}-4`).classList.add('off');
        this.selectors(`.${t}-4`).classList.remove('on');
        this.selectors(`.${t}-8`).classList.add('off');
        this.selectors(`.${t}-8`).classList.remove('on');
    }
}




}

