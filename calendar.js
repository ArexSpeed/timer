class Calendar{
  constructor(){
    this.now = new Date();
    this.day = this.now.getDate();
    this.month = this.now.getMonth();
    this.year = this.now.getFullYear();

    this.UiSelectors = {
      monthName: '[data-month-name]',
      btnPrevMonth: '[data-btn-prev-month]',
      btnNextMonth: '[data-btn-next-month]',
      calendarBox: '[data-calendar]',
  }
  }
  initCalendar(){
    this.monthName = document.querySelector(this.UiSelectors.monthName);
    this.btnPrevMonth = document.querySelector(this.UiSelectors.btnPrevMonth);
    this.btnNextMonth = document.querySelector(this.UiSelectors.btnNextMonth);
    this.calendar = document.querySelector(this.UiSelectors.calendarBox);
    this.showDate();
    this.addListeners();
    this.createCalendar();
  }

  showDate() {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    this.monthName.innerHTML = monthNames[this.month] + " " + this.year;
  }
  
  addListeners(){
    this.btnPrevMonth.addEventListener('click', ()=> {
      this.month--;
            if (this.month < 0) {
                this.month = 11;
                this.year--;
            }
            this.createCalendar();
            this.showDate();
    });
    this.btnNextMonth.addEventListener('click', ()=>{ 
      this.month++;
            if (this.month > 11) {
                this.month = 0;
                this.year++;
            }
            this.createCalendar();
            this.showDate();
  });
  }

  createCalendar() {
    this.calendar.innerHTML = "";

    //tworzymy tabelę z dniami kalendarza
    const tab = document.createElement("table");
    tab.classList.add("calendar-table");

    this.calendar.appendChild(tab);

    //create days name
    let tr = document.createElement("tr");
    tr.classList.add("days-names");
    const days = ["M", "T", "W", "T", "F", "S", "S"];
    days.forEach(day => {
        const th = document.createElement("th");
        th.innerHTML = day;
        tr.appendChild(th);
    });
    tab.appendChild(tr);

     //first day of month
     const tempDate = new Date(this.year, this.month, 1);
     let firstMonthDay = tempDate.getDay();
     if (firstMonthDay === 0) {
         firstMonthDay = 7;
     }

     //cells in day in month
     const daysInMonth = new Date(this.year, this.month+1, 0).getDate();
     const daysInMonthCell = daysInMonth + firstMonthDay - 1;

     if (firstMonthDay - 1 !== 0) {
         tr = document.createElement("tr");
         tab.appendChild(tr);
     }

     //free cells if month start other than monday
     for (let i=0; i < firstMonthDay - 1; i++) {
         const td = document.createElement("td");
         td.innerHTML = "";
         tr.appendChild(td);
     }
     //day tr
     for (let i = firstMonthDay-1; i<daysInMonthCell; i++) {
      if(i % 7 === 0){
          tr = document.createElement("tr");
          tab.appendChild(tr);
      }

      const td = document.createElement("td");
      td.innerText = i - firstMonthDay + 2;
      td.dayNr = i - firstMonthDay + 2;
      td.classList.add("day");

      if (this.year === this.now.getFullYear() && this.month === this.now.getMonth() && this.day === i - firstMonthDay + 2) {
          td.classList.add("current-day")
      }

      tr.appendChild(td);
  }

  tab.appendChild(tr);

  this.calendar.appendChild(tab);

}
}