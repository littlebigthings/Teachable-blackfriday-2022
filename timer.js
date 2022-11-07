class COUNTDOWNTIMER {
    constructor() {
        this.timer;
        this.showDay = showDays;
        // CURRENT DATE AND TIME
        this.now = new Date();
        // Element to get date from.
        this.getTimeFrom = document.querySelector("[data-item='timepicker']");
        this.dayElm = document.querySelector("[data-item='days']");
        this.dayDot = document.querySelector("[data-item='days-dot']");
        this.hourElm = document.querySelector("[data-item='hour']");
        this.minuteElm = document.querySelector("[data-item='minute']");
        this.secondElm = document.querySelector("[data-item='second']");
        this.wrapperToHide = document.querySelector("[data-item='count-wrapper']");

        // GET the date of event in format to calculate.
        this.countDownDate = this.getTimeFrom != undefined && this.getTimeFrom.textContent.length > 0 ? new Date(`${this.getTimeFrom.textContent}`) : null;

        // USING MOMENT.JS SET LOCAL TIMEZONE - IN THIS CASE "EUROPE/LONDON"
        // See full list of timezones here - https://gist.github.com/diogocapela/12c6617fc87607d11fd62d2a4f42b02a
        this.utcOffset = moment.tz(moment.utc(), 'America/New_York').utcOffset()
        // CALCULATE UTC OFFSET USING MOMENT.JS
        this.localOffset = moment().utcOffset();

        this.init();
    }

    init() {
        this.hideShowDay();
        this.calculateTimeOffset();
    }

    hideShowDay() {
        if (this.showDay != "true") {
            this.dayElm.parentElement.style.display = "none";
            this.dayDot.style.display = "none";
        }
    }

    calculateTimeOffset() {
        this.offset = this.utcOffset - this.localOffset

        this.compareDate = new Date(this.countDownDate) - this.now.getDate() - (this.offset * 60 * 1000);
        this.timer = setInterval(() => {
            this.doCountDown(this.compareDate);
        }, 1000);
    }

    doCountDown(toDate) {
        let dateEntered = new Date(toDate);
        let now = new Date();
        let difference = dateEntered.getTime() - now.getTime();
        if (difference <= 0) {
            this.dayElm.textContent = "00";
            this.hourElm.textContent = "00";
            this.minuteElm.textContent = "00";
            this.secondElm.textContent = "00";
            this.wrapperToHide.style.display = "none";


        } else {
            let seconds = Math.floor((difference % (1000 * 60)) / 1000);
            let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            let hours;
            let days;
            if (this.showDay != "true") {
                // days added as hours
                hours = Math.floor(difference / (1000 * 60 * 60));
            }
            else {
                // days not added as hours
                hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                days = Math.floor(hours / 24);
            }
            
            if (this.dayElm != undefined && days > 0){
                if(days.length>2){
                    this.dayElm.textContent = `0${days}`;
                }else{
                    this.dayElm.textContent = days;
                }
            }else if(this.dayElm != undefined){
                this.dayElm.textContent = "00";
            }
            if (this.hourElm != undefined && hours > 0){
                if(hours.length>2){
                    this.hourElm.textContent = `0${hours}`;
                }else{
                    this.hourElm.textContent = hours;
                }
            }
            else if(this.hourElm != undefined){
                this.hourElm.textContent = "00";
            }
            if (this.minuteElm != undefined && minutes > 0){
                if(minutes.length>2){
                    this.minuteElm.textContent = `0${minutes}`;
                }else{
                    this.minuteElm.textContent = minutes;
                }
            }
            else if(this.minuteElm != undefined){
                this.minuteElm.textContent = "00";
            }
            if (this.secondElm != undefined && seconds > 0){
                if(seconds.length>2){
                    this.secondElm.textContent = `0${seconds}`;
                }else{
                    this.secondElm.textContent = seconds;
                }
            }
            else if(this.secondElm != undefined){
                this.secondElm.textContent = "00";
            }
        }
    }

}

new COUNTDOWNTIMER;