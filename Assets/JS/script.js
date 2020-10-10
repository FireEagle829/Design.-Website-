// Hamburger Menu Collapsing

const showMenu = () => {
    document.querySelector(".nav-mobile").style.height = '220px';
    document.querySelector(".hamburger-line.line2").style.display = "none";
    document.querySelector(".hamburger-line.line1").style.transform = "rotate(40deg) translate(4px, 6px)";
    document.querySelector(".hamburger-line.line3").style.transform = "rotate(-40deg) translate(2.4px, -4.8px)";
}

const hideMenu = () => {
    document.querySelector(".nav-mobile").style.height = '0px';
    document.querySelector(".hamburger-line.line2").style.display = "block";
    document.querySelector(".hamburger-line.line1").style.transform = "rotate(0deg)";
    document.querySelector(".hamburger-line.line3").style.transform = "rotate(0deg) translateY(0px)";
}

let slider = document.querySelector(".slider");

function resizeFunction() {
    if (window.innerWidth >= 768) {
        hideMenu();
        slides.forEach((slide) => {
            slide.classList.remove("active-slide");
        })
        sliderControls.forEach(control => {
            control.style.backgroundColor = "#f9bcb9"
        })
        sliderControls[1].style.backgroundColor = "#ef7163"
        slides[1].classList.add("active-slide");
    } else if (window.innerWidth < 768) {
        slider.style.transform = "translateX(0px)";
    }
}

$(".hamburger-menu").on('click', () => {
    if (document.querySelector(".nav-mobile").style.height === '0px') {
        showMenu();
    } else {
        hideMenu();
    }
})

// Countup Animation

let animateCountup = true;

const countUp = () => {
    if (animateCountup) {
        animateCountup = false;
        var counter = 0;
        document.querySelector("#count1").textContent = counter;
        setInterval(() => {
            if (counter === 756) {
                clearInterval();
            } else {
                counter++;
                document.querySelector("#count1").textContent = counter;
            }
        }, 0.000001)
        
        var counter2 = 0;
        document.querySelector("#count2").textContent = counter2;
        setInterval(() => {
            if (counter2 === 435) {
                clearInterval();
            } else {
                counter2++;
                document.querySelector("#count2").textContent = counter2;
            }
        }, 0.000001)
        
        var counter3 = 0;
        document.querySelector("#count3").textContent = counter3;
        setInterval(() => {
            if (counter3 === 60) {
                clearInterval();
            } else {
                counter3++;
                document.querySelector("#count3").textContent = counter3;
            }
        }, 50)
    }
}

// Scrolling
window.addEventListener("scroll", () => {
    var windowBottomPosition = window.pageYOffset;
    var countBounding = document.querySelector("#count1").getBoundingClientRect().bottom;
    if (windowBottomPosition >= countBounding - 150) {
        if (animateCountup) {
            countUp();
        }
    }
})


// Slider

let slides = document.querySelectorAll(".slide");
let sliderControls = document.querySelectorAll(".slider-control-circle");
slides.forEach((slide) => {
    slide.addEventListener("click", () => {
        if (window.innerWidth >= 768) {
            slides.forEach((slideToBeAdjusted) => {
                slideToBeAdjusted.classList.remove("active-slide");
            })
            slide.classList.add("active-slide");
            let dataId = slide.getAttribute("data-id");
            sliderControls.forEach((control) => {
                control.style.backgroundColor = "#f9bcb9"
                if (control.getAttribute("data-id") == dataId) {
                    control.style.backgroundColor = "#ef7163"
                }
            })
            slider.style.transform = "translateX(" + dataId * 32 + "%)";
            if (dataId == "-1") {
                slides[0].style.opacity = 0;
            } else if (dataId == "0") {
                slides[0].style.opacity = 1
                slides[2].style.opacity = 1
            } else {
                slides[2].style.opacity = 0;
            }
        }
    })
});


slides.forEach((slide) => {
    slide.addEventListener("transitionend", () => {
        slides.forEach(slideToBeAdjusted => {
            if (slideToBeAdjusted.style.opacity === "0") {
                slideToBeAdjusted.style.visibility = "hidden";
            } else {
                slideToBeAdjusted.style.visibility = "visible";
            }
        })
    })
})

slides.forEach((slide) => {
    slide.addEventListener("transitionstart", () => {
        slides.forEach(slideToBeAdjusted => {
            if (slideToBeAdjusted.style.visibility === "hidden") {
                slideToBeAdjusted.style.opacity = "1";
            }
        })
    })
})

for (var i = 0; i < sliderControls.length; i++) {
    sliderControls[i].addEventListener("click", function() {
        if (window.innerWidth >= 768) {
            sliderControls.forEach(controlToBeAdjusted => {
                controlToBeAdjusted.style.backgroundColor = "#f9bcb9";
            })
            this.style.backgroundColor = "#ef7163";
            let dataId = this.getAttribute("data-id");
            slider.style.transform = "translateX(" + dataId * 32 + "%)";
            let dataIndex = this.getAttribute("data-index");
            slides.forEach((slideToBeAdjusted) => {
                slideToBeAdjusted.classList.remove("active-slide");
            })
            slides[dataIndex].classList.add("active-slide");
            if (dataIndex == "0") {
                slides[2].style.opacity = 0;
            } else if (dataIndex == "1") {
                slides[1].style.opacity = 1;
                slides[2].style.opacity = 1;
                slides[0].style.opacity = 1;
            } else {
                slides[0].style.opacity = 0;
            }
        }
    })
}
