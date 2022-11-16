class OPTINMONSTER {
    constructor() {
        this.allOptinCta = document.querySelectorAll("[data-cta='optin']");
        this.init();
    }

    init() {
        this.addlistener();
    }

    addlistener() {
        if (this.allOptinCta.length > 0) {
            this.allOptinCta.forEach(cta => {
                cta.addEventListener("click", (evt) => {
                    let dataTogetLink = evt.currentTarget.getAttribute("sub-text");
                    let linkData = evt.currentTarget.parentElement.querySelector(`[data-link='${dataTogetLink}']`).getAttribute("href");
                    document.addEventListener('om.Optin.init.submit', function (event) {
                        // Grab the email address submitted by the user.
                        const email = event.detail.Optin.data.fields.email;
                        event.detail.Campaign.data.actions[2].options.url = linkData + '&email=' + email;

                    });
                })
            })
        }
    }
}

new OPTINMONSTER;