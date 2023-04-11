

// Random Backgrounds Option
const randBackground = document.querySelectorAll(".random-backgrounds span");
// Random Background Option
let backgroundOption = true;
// Variable To Control The Background  Interval
let backgroundInterval;
// Landing Page Element
let landingPage = document.querySelector(".landing-page");
// ----------------------------- Scroll Top  ----------------------------------------
let toUp = document.querySelector(".scroll-top");
window.addEventListener('scroll', function() {
    this.scrollY >= 1000 ? toUp.classList.add('show') : toUp.classList.remove('show');
});
toUp.onclick = function() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
};
// ----------------------------- Scroller  ----------------------------------------
let scroller = document.querySelector(".scroller");
let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
window.addEventListener("scroll", function() {
    let scrollTop = document.documentElement.scrollTop;
    scroller.style.width = `${(scrollTop / height) * 100}%`;
});
// ----------------------------- Settings Box(Local Storage)  ---------------------
if (window.localStorage.getItem("Background")) {
    landingPage.style.backgroundImage = window.localStorage.getItem("Background");
}
if (window.localStorage.getItem("Background-Option") !== null) {
    randBackground.forEach((span) => {
        span.classList.remove("active");
    });
    if (window.localStorage.getItem("Background-Option") === "true") {
        backgroundOption = true;
        document.querySelector(".option-box .random-backgrounds .yes").classList.add("active");
    } else {
        backgroundOption = false;
        document.querySelector(".option-box .random-backgrounds .no").classList.add("active");
    }
}
// ------------------------------- Settings Box(Icon Gear) -------------------------
document.querySelector(".toggle-settings .option").onclick = function() {
    // Toggle Spin Class On Icon
    this.classList.toggle("fa-spin");
    // Toggle Class Open To Main Settings Box
    document.querySelector(".settings-box").classList.toggle("open");
};
// ------------------------- Settings Box(Switch Colors)  ------------------------

// Switch Colors
const colorsLi = document.querySelectorAll(".colors-list li");

if (window.localStorage.getItem("main-color")) {
    document.documentElement.style.setProperty("--main-color", window.localStorage.getItem("main-color"));
    colorsLi.forEach((li) => {
        li.classList.remove("active");
    });
    document.querySelector(`[data-color = "${window.localStorage.getItem("main-color")}"]`).classList.add("active");
}

// Loop On ALL List Items
colorsLi.forEach((li) => {
    li.addEventListener("click", (e) => {
        handleActive(e);
        // Set Color On ROOT
        document.documentElement.style.setProperty("--main-color", e.target.dataset.color);
        window.localStorage.setItem("main-color", e.target.dataset.color);
    });
});
// ----------------- Settings Box(Switch Random backgrounds Option)  -------------------
randBackground.forEach((span) => {
    span.addEventListener("click", (e) => {
        handleActive(e);
        if (e.target.dataset.background === "yes") {
            backgroundOption = true;
            randomizeImgs();
            window.localStorage.setItem("Background-Option", true);
        } else {
            backgroundOption = false;
            clearInterval(backgroundInterval);
            window.localStorage.setItem("Background", landingPage.style.backgroundImage);
            window.localStorage.setItem("Background-Option", false);
        }
    });
});
// -------------------------- Settings Box(Bullets Option)  ------------------------
// Bullets Options
let bulletsSpan = document.querySelectorAll(".bullets-options span");
// Bullets Container
let bulletsContainer = document.querySelector(".nav-bullets");
// Bullets In Local Storage
let bulletLocalItem = window.localStorage.getItem("bullets-option");

if (bulletLocalItem != null) {
    bulletsSpan.forEach((span) => {
        span.classList.remove("active");
    });
    if (bulletLocalItem === "block") {
        bulletsContainer.style.display = "block";
        document.querySelector(".bullets-options .yes").classList.add("active");
    } else {
        bulletsContainer.style.display = "none";
        document.querySelector(".bullets-options .no").classList.add("active");
    }
}

bulletsSpan.forEach((span) => {
    span.addEventListener("click", (e) => {
        handleActive(e);
        if (span.dataset.display === "show") {
            bulletsContainer.style.display = "block";
            window.localStorage.setItem("bullets-option", "block");
        } else {
            bulletsContainer.style.display = "none";
            window.localStorage.setItem("bullets-option", "none");
        }
    });
});
// -------------------------- Settings Box(Reset Button)  ------------------------
document.querySelector(".reset-options").onclick = function() {
    window.localStorage.clear();
    // window.localStorage.removeItem("bullets-option");
    // window.localStorage.removeItem("Background-Option");
    // window.localStorage.removeItem("main-color");
    window.location.reload();
};

// ------------------------------ Landing Page -------------------------------------

// Array Of Images
let imgsArray = ["LandingPage1.webp", "LandingPage2.jpg", "LandingPage3.jpg", "LandingPage4.jpg", "LandingPage5.jpg"];

// Change Background Image Url
// landingPage.style.backgroundImage = `url("imgs/LandingPage2.jpg")`;


function randomizeImgs() {
    if (backgroundOption === true) {
        backgroundInterval = setInterval(() => {
            // Get Random Number
            let randomNumber = Math.floor(Math.random() * imgsArray.length);
            // Change Background Image Url
            landingPage.style.backgroundImage = `url("imgs/${imgsArray[randomNumber]}")`;
        }, 1000);
    }
}
randomizeImgs();

// ------------------------------ Skills -------------------------------------
let ourSkills = document.querySelector(".skills");
let spans = document.querySelectorAll(".skills .skill-progress span");

window.onscroll = function() {
    if (window.scrollY >= ourSkills.offsetTop - 200) {
        spans.forEach((span) => {
            span.style.width = span.dataset.progress;
        });
    } else {
        spans.forEach((span) => {
            span.style.width = 0;
        });
    }
};

// ------------------------------ Gallery -------------------------------------
let shuffleLis = document.querySelectorAll(".gallery .shuffle li");
let imgBox = document.querySelectorAll(".gallery .images-box img");

shuffleLis.forEach((li) => {
    li.addEventListener("click", removeActive);
    li.addEventListener("click", manageImgs);
});
function removeActive() {
    shuffleLis.forEach((li) => {
        li.classList.remove("active");
        this.classList.add("active");
    });
}
function manageImgs() {
    imgBox.forEach((img) => {
        img.style.display = "none";
    });
    document.querySelectorAll(this.dataset.cat).forEach((img) => {
        img.style.display = "block";
    });
}

// Create Pop Up With The Image
imgBox.forEach((img) => {
    img.addEventListener(("click"), (e) => {
        // Create Overlay Element
        let overlay = document.createElement("div");
        overlay.classList.add("popup-overlay");
        document.body.appendChild(overlay);
        // Create The Pop up Box
        let popupBox = document.createElement("div");
        popupBox.classList.add("popup-box");
        // Create The Image
        let popupImage = document.createElement("img");
        // Set Src To The Image
        popupImage.src = e.target.src;
        // Add Image To Popup
        popupBox.appendChild(popupImage);
        // Add Popup Box To Body
        document.body.appendChild(popupBox);

        if (img.alt !== null) {
            // Create Heading
            let imgHeading = document.createElement("h3");
            let imgText = document.createTextNode(e.target.alt);
            imgHeading.appendChild(imgText);
            // Append The Heading To Popup Box
            popupBox.prepend(imgHeading);
        }

        // Create The Close Span
        let closeButton = document.createElement("span");
        closeButton.classList.add("close-button");
        let closeButtonText = document.createTextNode("X");
        closeButton.appendChild(closeButtonText);
        popupBox.prepend(closeButton);

    });
});

// Close Popup 
document.addEventListener("click", function(e) {
    if (e.target.className == "close-button") {
        // Remove The Current Popup
        e.target.parentElement.remove();
        // Remove Overlay
        document.querySelector(".popup-overlay").remove();
    }
});
document.addEventListener("click", (e) => {
    if (e.target.className == "popup-overlay") {
        e.target.remove();
        document.querySelector(".popup-box").remove();
    }
});

// ---------------------------------  Bullets && Links -------------------------------

// Select All Bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullet");

// Select All links
const allLinks = document.querySelectorAll(".landing-page .links li a");


function scrollToSomeWhere(elements) {
    elements.forEach((ele) => {
        ele.addEventListener("click", (e) => {
            e.preventDefault();
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior: 'smooth',
            });
        });
    });
}
scrollToSomeWhere(allBullets);
scrollToSomeWhere(allLinks);

// -------------------------  Function To Handle Active Class -------------------------------
function handleActive(ev) {
    ev.target.parentElement.querySelectorAll(".active").forEach((el) => {
        el.classList.remove("active");
    });
    ev.target.classList.add("active");
}
// --------------------------------  Burger Menu  ---------------------------------------
let toggleBtn = document.querySelector(".toggle-menu");
let tlinks = document.querySelector(".links");

toggleBtn.onclick = function(e) {

    // Stop Propagetion
    e.stopPropagation();

    this.classList.toggle("menu-active");
    tlinks.classList.toggle("open");
};

// Click AnyWhere Outside Menu And Toggle Button
document.addEventListener("click", (e) => {
    if (e.target !== toggleBtn && e.target != tlinks) {
        // Check If Menu Is Open
        if (tlinks.classList.contains("open")) {
            // console.log("Menu Is Open");
            toggleBtn.classList.toggle("menu-active");
            tlinks.classList.toggle("open");
        }
    }
});
// Stop Propagation On Menu
tlinks.onclick = function(e) {
    e.stopPropagation();
};