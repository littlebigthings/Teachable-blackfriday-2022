let callClass = false;
class SHOWANDHIDEPLAN {
    constructor() {
        this.allPlanCta = document.querySelectorAll("[data-plan]");
        this.allPLanCards = document.querySelectorAll("[data-wrapper='plan-card']");
        this.allFeatureData = document.querySelectorAll("[data-feature]");
        this.init();
    }

    init() {
        this.startListener();
    }

    startListener() {
        if (this.allPlanCta.length > 0) {
            this.allPlanCta.forEach(cta => {
                cta.addEventListener("click", (evt) => {
                    let clickedOnCta = evt.currentTarget.getAttribute("data-plan");
                    this.showAndHideCard(clickedOnCta);
                    this.showAndHideFeatures(clickedOnCta);
                    this.activeCta(evt.currentTarget);
                })
            })
            this.allPlanCta[1].click();
        }
    }

    showAndHideCard(cardName) {
        if (this.allPLanCards.length > 0) {
            this.allPLanCards.forEach(plan => {
                let planText = plan.querySelector("[data-plan-wrp='name']").innerText;
                if (planText === cardName) {
                    plan.classList.remove("hide");
                }
                else {
                    plan.classList.add("hide")
                }
            })
        }
    }

    showAndHideFeatures(planName) {
        if (this.allFeatureData.length > 0) {
            this.allFeatureData.forEach(feature => {
                let featureFor = feature.getAttribute("data-feature")
                if (featureFor === planName) {
                    feature.classList.remove("hide");
                } else {
                    feature.classList.add("hide");
                }
            })
        }
    }

    activeCta(clickElm) {
        this.allPlanCta.forEach(cta => {
            let activeDotElm = cta.querySelector(".radio-btn ");
            if (cta === clickElm) {
                activeDotElm.classList.add("active-btn")
            }
            else {
                activeDotElm.classList.remove("active-btn")
            }
        })
    }
}
function startRadioButton() {
    if (window.screen.width < 786 && !callClass) {
        callClass = true;
        new SHOWANDHIDEPLAN;
    }
    else if (callClass) {
        callClass = false;
    } else {
        window.addEventListener("resize", () => {
            if (window.screen.width < 786 && !callClass) {
                callClass = true;
                new SHOWANDHIDEPLAN;
            }
            else if (callClass) {
                callClass = false;
            }
        })
    }
}
startRadioButton();