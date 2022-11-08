// add scrollTrigger to detect the element and when it comes to view just pin it.
// add swiper to make it as a vertical slider.

class VERTICALSLIDER {
    constructor(slider, elemToObserve, pagination) {
        this.sliderElm = slider;
        this.itemToObserve = elemToObserve;
        this.pagiItem = pagination;
        this.swiperMouseControl = null;
        this.body = document.body;
        this.documentElement = document.documentElement;
        this.scrollTop = document.documentElement.scrollTop;
        this.wasOnEdge = false;
        this.init();
    }
    init() {
        this.addSlider();
        this.addScrollTrigger();
    }

    addScrollTrigger() {
        // let enable = true;
        ScrollTrigger.create({
            trigger: this.itemToObserve,
            start: "top top",
            end:"bottom bottom",
            // pin:true,
            markers: true,
            onEnter: () => {
                if(!this.wasOnEdge)this.disableScroll()
                this.swiperMouseControl.mousewheel.enable();
            },
            onEnterBack: () => {
                if(!this.wasOnEdge)this.disableScroll()
                this.swiperMouseControl.mousewheel.enable();
            },
            onLeave: () => {
                this.swiperMouseControl.mousewheel.disable();
            },
            onLeaveBack: () => {
                this.swiperMouseControl.mousewheel.disable();
            }
        })
    }

    addSlider() {
        if (this.sliderElm != undefined || this.sliderElm != null) {
            this.swiper = new Swiper(this.sliderElm, {
                direction: 'horizontal',
                mousewheel: true,
                grabCursor: false,
                slidesPerView: 1,
                spaceBetween: 0,
                longSwipes: false,
                centeredSlides: false,
                effect: 'fade',
                fadeEffect: {
                    crossFade: true
                },
                // autoHeight: true,
                mousewheel: {
                    invert: false,
                    releaseOnEdges: false,
                    // eventsTarget: this.itemToObserve,
                    // forceToAxis: true,
                    sensitivity: 0,
                    thresholdDelta: 2,
                    thresholdTime: 1000,
                },
                keyboard: {
                    enabled: true,
                    onlyInViewport: true,
                  },
                pagination: {
                    el: this.pagiItem,
                    clickable: true,
                    bulletClass: "inactive-page-blot",
                    bulletActiveClass: "active-page-blot",
                },
                on: {
                    init: (swiper) => {
                        swiper.mousewheel.disable();
                        this.swiperMouseControl = swiper;
                    }
                },
            });
            this.swiper.on('slideChange', (swiper) => {
                this.wasOnEdge = false;
                // setTimeout(() => {
                // }, 500);
            })
            this.swiper.on('toEdge', (swiper) => {
                this.wasOnEdge = true;
                this.swiper.params.mousewheel.releaseOnEdges = true;
                this.enableScroll()
                // setTimeout(() => {
                // }, 500);
            })
        }
    }
    disableScroll() {
        this.scrollTop = this.documentElement.scrollTop;
        this.body.style.top = `-${this.scrollTop}px`;
        // this.body.classList.add("scroll-disabled");
    }
    
    enableScroll() {
        // this.body.classList.remove("scroll-disabled");
        this.documentElement.scrollTop = this.scrollTop;
        this.body.style.removeProperty("top");
    }
}

let sliderElm = document.querySelector(".swiper");
let elemToObserve = document.querySelector("[wrapper='observe']");
let pagination = document.querySelector(".swiper-pagination");

if (sliderElm != undefined && elemToObserve != undefined && pagination != undefined) {
    new VERTICALSLIDER(sliderElm, elemToObserve, pagination)
}