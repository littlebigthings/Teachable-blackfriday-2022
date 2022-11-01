class COUNTDOWNTIMER {
    constructor() {
        this.timer;
        // CURRENT DATE AND TIME
        this.now = new Date();
        // Element to get date from.
        this.getTimeFrom = document.querySelector("[data-item='timepicker']");
        this.hourElm = document.querySelector("[data-item='hour']");
        this.minuteElm = document.querySelector("[data-item='minute']");
        this.secondElm = document.querySelector("[data-item='second']");

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
        this.calculateTimeOffset();
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
            this.hourElm.parentElement.style.display = "none"
    
        } else {
    
            let seconds = Math.floor((difference % (1000 * 60)) / 1000);
            let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            let hours = Math.floor(difference / (1000 * 60 * 60));
            // var hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
            this.hourElm.textContent = hours;
            this.minuteElm.textContent = minutes;
            this.secondElm.textContent = seconds;
    
        }
    }

}

new COUNTDOWNTIMER;