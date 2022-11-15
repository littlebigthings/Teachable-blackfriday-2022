class FADESLIDER {
    constructor() {
        this.$sliderElement = document.querySelector("[data-item='slider']");
        this.$elementToObserve = document.querySelector("[data-item='observe']");
        this.isPlaying = false;
        this.init();
    }

    init() {
        this.activateSlider();
        this.startScrollListener();
    }

    startScrollListener() {
        this.thresholdVal = window.screen.width < 768 ? 0.4 : 0.8;
        this.observer = new IntersectionObserver((wrapper) => {
            if (wrapper[0]['isIntersecting'] == true && !this.isPlaying) {
                this.sliderOne.slick("slickPlay");
                // this.sliderOne.slick("slickNext");
                this.isPlaying = true;
            }
            else if (this.isPlaying) {
                this.sliderOne.slick("slickPause");
                this.isPlaying = false;
            }
        }, { root: null, threshold: this.thresholdVal, rootMargin: '0px' });
        this.observer.observe(this.$elementToObserve);
    }

    // activate slider
    activateSlider() {
        const $paginationBox = document.querySelector("[bread-crums-box]");
        const $patinationItem = $paginationBox.querySelectorAll("[breadcrum='dot']");
        // clone dots
        $("[data-item='slider']").on("init", (event, slick) => {
            let numberOfSlides = slick.slideCount;
            if (numberOfSlides > $patinationItem.length) {
                let dotsToAdd = numberOfSlides - $patinationItem.length;
                for (let i = 0; i < dotsToAdd; i++) {
                    $paginationBox.appendChild($patinationItem[0].cloneNode(true));
                }
            }
            this.$newPaginationItems = $paginationBox.querySelectorAll("[breadcrum='dot']");
            this.$newPaginationItems.forEach((item, index) => {
                item.setAttribute("item-ixd", index)
            })

            this.addRemoveActive();
            // adding event listener into the dots, reviews.
            this.$newPaginationItems.forEach((item) => {
                item.addEventListener("click", (e) => {
                    const currIdx = e.currentTarget.getAttribute("item-ixd")
                    this.sliderOne.slick("slickGoTo", currIdx);
                    this.addRemoveActive(currIdx);
                });
            });
        })

        this.sliderOne = $(this.$sliderElement).slick({
            dots: false,
            pauseOnFocus: false,
            pauseOnHover: false,
            infinite: true,
            autoplay: false,
            autoplaySpeed: 10000,
            arrows: false,
            speed: 280,
            fade: true,
            cssEase: "linear",
            appendDots: $paginationBox,
        });

        this.sliderOne.on("swipe", (event, slick, direction) => {
            this.addRemoveActive(slick.currentSlide);
        });
        // show component one by one.
        this.sliderOne.on(
            "afterChange",
            (event, slick, currentSlide, nextSlide) => {
                this.addRemoveActive(currentSlide);
            }
        );
    }
    // remove and add active class into the dots.
    addRemoveActive(index = 0) {
        this.$newPaginationItems.forEach((item) =>
            item.classList.remove("active-dot")
        );
        this.$newPaginationItems[index].classList.add("active-dot");
    }
}
new FADESLIDER;