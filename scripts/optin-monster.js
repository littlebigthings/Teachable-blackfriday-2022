class OPTINMONSTER{
    constructor(){
        this.allOptinCta = document.querySelectorAll("[data-cta='optin']");
        this.optinFormInput = null;
        this.optinFormCta = null;

        this.init();
    }

    init(){
        this.addlistener();
    }

    addlistener(){
        if(this.allOptinCta.length >0){
            this.allOptinCta.forEach(cta => {
                cta.addEventListener("click",(evt) => {
                    let dataTogetLink = evt.currentTarget.getAttribute("sub-text");
                    let linkData = evt.currentTarget.parentElement.querySelector(`[data-link='${dataTogetLink}']`).getAttribute("href");
                    if(this.optinFormCta == null && this.optinFormInput == null){
                        setTimeout(() => {
                            this.optinFormInput = document.querySelector("input[type='email']");
                            this.optinFormCta = document.querySelector("button[type='submit']");
                            this.optinFormCta.addEventListener("click",() => {
                                let emailData = this.optinFormInput.value;
                                if(emailData.length > 0){
                                    this.handleSubmission(emailData, linkData);
                                }
                            })
                        },200)
                    }
                })
            })
        }
    }

    handleSubmission(email, linkToRedirect){
        console.log(email, linkToRedirect)
        let urlToRedirect = linkToRedirect + '&email=' + email;
        window.location.href = urlToRedirect;
    }
}

new OPTINMONSTER;