const featureTab = document.querySelectorAll("[wrapper='faq']");

// adding attribute into tabs
function addAttrToTabs() {
    featureTab.forEach(fetTab => {
        fetTab.setAttribute("isactive", true);
        let contentWrp = fetTab.querySelector("[wrapper='content']");
        if (contentWrp != undefined || contentWrp != null) {
            let wrpHeight = contentWrp.offsetHeight;
            contentWrp.setAttribute("wrpheight", wrpHeight);
        }
    })
}
// reset everything
function resetAllTabs(firstTime) {
    if (!featureTab) return;
    featureTab.forEach(tabItem => {
        let checkFirstElem = [...tabItem.parentElement.childNodes];
        if(checkFirstElem.length != 0){
            if((checkFirstElem.indexOf(tabItem) == 0) && firstTime){
                let openBtn = tabItem.querySelector("[btn='open']");
                gsap.to(openBtn, {rotation:0, transformOrigin:"center center", ease: "circ.out", duration: 0.4, });
            }
            else if (tabItem.getAttribute("isactive") == "true") {
                tabItem.setAttribute("isactive", false);
                let contentBox = tabItem.querySelector("[wrapper='content']");
                let openBtn = tabItem.querySelector("[btn='open']");
                gsap.to(contentBox, { height: "0", ease: "circ.out", duration: 0.4, });
                gsap.to(openBtn, { rotation:-90, transformOrigin:"center center", ease: "circ.out", duration: 0.4, });
            }
        }
    })
}

//listen to click events on tabs and animate
function listenToevents() {
    featureTab.forEach(tab => {
        tab.addEventListener("click", (evt) => {
            let clickedOn = evt.currentTarget;
            if (clickedOn.getAttribute("isactive") == "false") {
                resetAllTabs(false);
                clickedOn.setAttribute("isactive", true);
                let getContentTab = clickedOn.querySelector("[wrapper='content']");
                let openBtn = clickedOn.querySelector("[btn='open']");
                let increaseHeight = getContentTab.getAttribute("wrpheight");
                gsap.to(getContentTab, { height: increaseHeight, ease: "circ.out", duration: 0.4, });
                gsap.to(openBtn, { rotation:0, transformOrigin:"center center", ease: "circ.out", duration: 0.4, });
            }
            else{
                resetAllTabs(false)
            }
        })
    })
}

if(featureTab.length != 0){
    addAttrToTabs();
    resetAllTabs(true);
    listenToevents();
}