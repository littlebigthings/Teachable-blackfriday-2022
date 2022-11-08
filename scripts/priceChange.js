class UPDATEPRICE {
    constructor() {
        this.monthBtnArr = document.querySelectorAll("[button='monthly']");
        this.annualBtnArr = document.querySelectorAll("[button='annual']");
        this.allButtons = document.querySelectorAll("[button]");
        this.actualMonthlyPriceArr = document.querySelectorAll("[monthly-price='actual']");
        this.discountMonthlyPriceArr = document.querySelectorAll("[monthly-price='discount']");
        this.actualAnnualPriceArr = document.querySelectorAll("[annual-price='actual']");
        this.discountAnnualPriceArr = document.querySelectorAll("[annual-price='discount']");
        this.subTextMonthly = document.querySelectorAll("[sub-text='monthly']");
        this.subTextAnnual = document.querySelectorAll("[sub-text='annual']");
        this.init();
    }

    init() {
        this.listenToClick();
        this.openDefault();
    }

    listenToClick() {
        this.allButtons.forEach(btn => {
            btn.removeAttribute("href")
            btn.addEventListener("click", (e) => {
                let toShowPrice = e.currentTarget.getAttribute("button");
                if (toShowPrice.length > 0) {
                    if (toShowPrice == "monthly") {
                        this.resetPrice(true, false);
                    }
                    else if (toShowPrice == "annual") {
                        this.resetPrice(false, true);
                    }
                }

            })
        })
    }

    openDefault(){
        // code to select default active state of prices.
        this.annualBtnArr["0"].click();
        // comment the above and uncomment the below one to make month default.
        // this.monthBtnArr[0].click();
    }
    resetPrice(monthly, annual) {
        if ((this.actualMonthlyPriceArr.length > 0 && this.discountMonthlyPriceArr.length > 0) && (this.actualAnnualPriceArr.length > 0 && this.discountAnnualPriceArr.length > 0)) {
            if (monthly) {
                this.monthBtnArr.forEach(btn => {
                    btn.classList.remove("not-active");
                });
                this.annualBtnArr.forEach(btn => {
                    btn.classList.add("not-active");
                });
                this.actualAnnualPriceArr.forEach(priceElm => {
                    priceElm.classList.add("hide");
                });
                this.discountAnnualPriceArr.forEach(priceElm => {
                    priceElm.classList.add("hide");
                });
                this.actualMonthlyPriceArr.forEach(priceElm => {
                    priceElm.classList.remove("hide");
                });
                this.discountMonthlyPriceArr.forEach(priceElm => {
                    priceElm.classList.remove("hide");
                });
                this.subTextMonthly.forEach(priceElm => {
                    priceElm.classList.remove("hide");
                });
                this.subTextAnnual.forEach(priceElm => {
                    priceElm.classList.add("hide");
                });
            }
            else if (annual) {
                this.monthBtnArr.forEach(btn => {
                    btn.classList.add("not-active");
                });
                this.annualBtnArr.forEach(btn => {
                    btn.classList.remove("not-active");
                });
                this.actualMonthlyPriceArr.forEach(priceElm => {
                    priceElm.classList.add("hide");
                });
                this.discountMonthlyPriceArr.forEach(priceElm => {
                    priceElm.classList.add("hide");
                });
                this.actualAnnualPriceArr.forEach(priceElm => {
                    priceElm.classList.remove("hide");
                });
                this.discountAnnualPriceArr.forEach(priceElm => {
                    priceElm.classList.remove("hide");
                });
                this.subTextMonthly.forEach(priceElm => {
                    priceElm.classList.add("hide");
                });
                this.subTextAnnual.forEach(priceElm => {
                    priceElm.classList.remove("hide");
                });
            }
        }
    }
}

new UPDATEPRICE;