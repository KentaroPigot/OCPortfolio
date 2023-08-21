import Landing1 from "./Experience/worlds/Landing1.js";
import SectionProjects from "./Experience/worlds/SectionProjects.js";
import CursorStyle from "./cursorStyle.js";
import section2Animations from "../src/Experience/gsap/section2Animations.js";
import section3Animations from "../src/Experience/gsap/section3Animations.js";

// document.documentElement.classList.add("lock-scroll");
const landing = new Landing1(document.querySelector("canvas.webgl"));
// const sectionProjects = new SectionProjects(
//   document.querySelector("canvas.webGlProjects")
// );
const section3 = document.querySelector(".section--3");
const section4 = document.querySelector(".section--4");
const section5 = document.querySelector(".section--5");
const section6 = document.querySelector(".section--6");
const section2Animation = new section2Animations().animate();
const section3Animation = new section3Animations().transition();
const section3hover = new section3Animations();
let currenSection = 0;
let screenYFinger;
let prevScreenYFinger;
let isTouching = false;
let isAnimating = false;
let isScrollingSection = false;

function playAnimationOnScroll(event) {
  // console.log(window.scrollY);
  // console.log(currenSection);
  // console.log(event.deltaY);
  // console.log(isAnimating);
  // console.log(event);

  if (isAnimating) return;
  const delta = event.deltaY;
  isAnimating = true;

  if (delta > 0) {
    if (currenSection === 0) {
      // console.log("hey1");
      currenSection = 1;
      section2Animation.play().eventCallback("onComplete", () => {
        isAnimating = false;
      });
    } else if (currenSection === 1) {
      currenSection = 2;
      section3Animation.play().eventCallback("onComplete", () => {
        isAnimating = false;
        section4.classList.add("active");
        section5.classList.add("active");
        section6.classList.add("active");
      });
    } else {
      isAnimating = false;
    }
  } else if (delta < 0) {
    if (currenSection === 1) {
      currenSection = 0;
      section2Animation.reverse().eventCallback("onReverseComplete", () => {
        isAnimating = false;
      });
    } else if (currenSection === 2) {
      if (window.scrollY === 0) {
        section4.classList.remove("active");
        section5.classList.remove("active");
        section6.classList.remove("active");
      }
      if (window.scrollY > 0) {
        isAnimating = false;
        return;
      }
      currenSection = 1;
      section4.classList.remove("active");
      section5.classList.remove("active");
      section6.classList.remove("active");
      section3Animation.reverse().eventCallback("onReverseComplete", () => {
        isAnimating = false;
      });
    } else {
      isAnimating = false;
    }
  }
}

const handleTouchMove = (e) => {
  if (isAnimating) return;

  // console.log(currenSection);

  //   on récupère la position
  screenYFinger = e.touches[0].screenY;

  // console.log(screenYFinger - prevScreenYFinger);

  // Get first finger position to compare and get the travelled finger distance.
  if (!isTouching) {
    prevScreenYFinger = screenYFinger;
    isTouching = true;
  }

  // Anime seulement si distance minimal du doigt sur écran parcouru.
  if (screenYFinger - prevScreenYFinger < -20) {
    if (currenSection === 0) {
      isAnimating = true;
      currenSection = 1;
      section2Animation.play().eventCallback("onComplete", () => {
        isAnimating = false;
      });
    } else if (currenSection === 1) {
      isAnimating = true;
      currenSection = 2;
      section3Animation.play().eventCallback("onComplete", () => {
        isAnimating = false;
        section4.classList.add("active");
        section5.classList.add("active");
        section6.classList.add("active");
      });
    }
  }

  if (screenYFinger - prevScreenYFinger > 10) {
    if (currenSection === 1) {
      isAnimating = true;
      currenSection = 0;
      section2Animation.reverse().eventCallback("onReverseComplete", () => {
        isAnimating = false;
      });
    } else if (currenSection === 2) {
      if (window.scrollY === 0) {
        section4.classList.remove("active");
        section5.classList.remove("active");
        section6.classList.remove("active");
      }
      if (window.scrollY > 0) {
        isAnimating = false;
        return;
      }
      isAnimating = true;
      currenSection = 1;
      section3Animation.reverse().eventCallback("onReverseComplete", () => {
        isAnimating = false;
      });
      section4.classList.remove("active");
      section5.classList.remove("active");
      section6.classList.remove("active");
    }
  }
};

// Reset finger positions.
const handleTouchEnd = () => {
  isTouching = false;
  prevScreenYFinger = null;
  screenYFinger = null;
};

const hoverAnimation = () => {
  let hoverAreas = [];
  for (let i = 1; i < 4; i++) {
    hoverAreas.push(
      ...section3.querySelectorAll(`[class^="section--3_"][class$="--${i}"]`)
    );
  }
  hoverAreas.forEach((area) => {
    area.addEventListener("mouseover", (e) => {
      const area = e.target.dataset.area;
      section3hover.hover(area).play();
    });
    area.addEventListener("mouseleave", (e) => {
      const area = e.target.dataset.area;
      section3hover.leave(area).play();
    });
  });
};
hoverAnimation();

window.addEventListener("wheel", playAnimationOnScroll);
document.addEventListener("touchmove", handleTouchMove, false);
document.addEventListener("touchend", handleTouchEnd, false);

// 2. Mettre setTimeOut pour le hover
// 4. Créer 5ème zone. Et essayer de bouger le pc (toujours scroll)

// (5. Corriger slider portfolio)
