function offerTimer() {
    // Set the date we're counting down to
    let getTimeFrom = document.querySelector("[data-item='timepicker']");
    let countDownDate = new Date(`${getTimeFrom.textContent}`).getTime();
    let hourElm = document.querySelector("[data-item='hour']");
    let minuteElm = document.querySelector("[data-item='minute']");
    let secondElm = document.querySelector("[data-item='second']");

    // Update the count down every 1 second
    let x = setInterval(function () {

        // Get today's date and time
        let now = new Date().getTime();

        // Find the distance between now and the count down date
        let distance = countDownDate - now;

        // Time calculations for days, hours, minutes and seconds
        // let days = Math.floor(distance / (1000 * 60 * 60 * 24));
        let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display the result in the element with id="demo"
        hourElm.textContent = hours;
        minuteElm.textContent = minutes;
        secondElm.textContent = seconds;

        // If the count down is finished, write some text
        if (distance < 0) {
            clearInterval(x);
            // document.getElementById("demo").innerHTML = "EXPIRED";
        }
    }, 1000);
}
offerTimer();