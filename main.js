import './style.css'
import gsap from "gsap";
import { RoughEase } from "gsap/EasePack";

// dom
const toggle = document.querySelector(".toggle .toggle__switch");
const windowGroup = document.querySelector("#windows");
const windows = document.querySelectorAll("#windows path");
const city1 = document.querySelector("#city-1");
const city2 = document.querySelector("#city-2");
const city3 = document.querySelector("#city-3");
const city4 = document.querySelector("#city-4");
const city5 = document.querySelector("#city-5");
const city6 = document.querySelector("#city-6");
const streets = document.querySelector("#streets");
const streetLines = document.querySelectorAll("#street-lines");
const lights1 = document.querySelector("#lights-1").children;
const twinkles = document.querySelector("#twinkles").children;
const lightsGroup = document.querySelectorAll(
  "#lights-1, #lights-2, #twinkles"
);
const audio = document.querySelector("audio");
const play = document.querySelector(".play");
const playStatus = document.getElementById("play-status");

// timelines
const tl = gsap.timeline({ repeat: -1, yoyo: true });
const twinkletl = gsap.timeline({ repeat: -1, yoyo: true });
const lightstl = gsap.timeline({ repeat: 0, yoyo: true });
const bgtl = gsap.timeline({ repeat: 0, yoyo: true });
const windowtl = gsap.timeline({ repeat: 0, yoyo: true });
const citytl = gsap.timeline({ repeat: 0, yoyo: true });

// colors
const colors = {
  sky: {
    night: ["#13151D", "#272935"],
    day: ["#BBE5FF", "#80CFFE"]
  },
  buildings: {
    night: ["#2F2F2F", "#4C4C4C", "#666666", "#7F7F7F", "#424242", "#CBCBCB"],
    day: ["#EFEFEF", "#CBCBCB", "#A2A2A2", "#A2A2A2", "#424242", "#7F7F7F"]
  },
  street: {
    night: "#8B8B8B",
    day: "#585858"
  },
  streetLine: {
    night: "#C5C5C5",
    day: "#D9D9D9"
  }
};

// state
const state = {
  isDay: false,
  cooldown: false,
  isPlaying: false
};

// setup
gsap.set(twinkles, {
  transformOrigin: "center center"
});

// constant timelines
tl.to(windows, {
  duration: 0.1,
  autoAlpha: "random(0, 1, 1)",
  ease: RoughEase.ease.config({
    points: 1,
    strength: 2,
    clamp: true,
    randomize: false
  }),
  stagger: {
    from: "random",
    amount: 50
  }
}).to(
  lights1,
  {
    duration: 0.3,
    autoAlpha: "random(0, 1, 1)",
    ease: RoughEase.ease.config({
      points: 1,
      strength: 1,
      clamp: true,
      randomize: true
    }),
    stagger: {
      from: "random",
      amount: 20
    }
  },
  0
);

twinkletl.to(twinkles, {
  duration: 150,
  rotate: "random(-360, 360)",
  ease: RoughEase.ease.config({
    points: 20,
    strength: 2,
    clamp: true,
    randomize: false
  }),
  stagger: {
    from: "random",
    amount: 0.1
  }
});

// methods
function changeToDay() {
  bgtl.to(document.body, {
    duration: 1,
    "--color-1": colors.sky.day[0],
    "--color-2": colors.sky.day[1]
  });

  windowtl.to(windowGroup, {
    duration: 1,
    autoAlpha: 0
  });

  lightstl.to(lightsGroup, {
    duration: 1,
    autoAlpha: 0
  });

  citytl
    .to(city1, {
      duration: 1,
      fill: colors.buildings.day[0]
    })
    .to(
      city2,
      {
        duration: 1,
        fill: colors.buildings.day[1]
      },
      0
    )
    .to(
      city3,
      {
        duration: 1,
        fill: colors.buildings.day[2]
      },
      0
    )
    .to(
      city4,
      {
        duration: 1,
        fill: colors.buildings.day[3]
      },
      0
    )
    .to(
      city5,
      {
        duration: 1,
        fill: colors.buildings.day[4]
      },
      0
    )
    .to(
      city6,
      {
        duration: 1,
        fill: colors.buildings.day[5]
      },
      0
    )
    .to(
      streets,
      {
        duration: 1,
        fill: colors.street.day
      },
      0
    )
    .to(
      streetLines,
      {
        duration: 1,
        fill: colors.streetLine.day
      },
      0
    );
}

// function that changes to night
function changeToNight() {
  bgtl.to(document.body, {
    duration: 1,
    "--color-1": colors.sky.night[0],
    "--color-2": colors.sky.night[1]
  });

  windowtl.to(windowGroup, {
    duration: 1,
    autoAlpha: 1
  });

  lightstl.to(lightsGroup, {
    duration: 1,
    autoAlpha: 1
  });

  citytl
    .to(city6, {
      duration: 1,
      fill: colors.buildings.night[5]
    })
    .to(
      city5,
      {
        duration: 1,
        fill: colors.buildings.night[4]
      },
      0
    )
    .to(
      city4,
      {
        duration: 1,
        fill: colors.buildings.night[3]
      },
      0
    )
    .to(
      city3,
      {
        duration: 1,
        fill: colors.buildings.night[2]
      },
      0
    )
    .to(
      city2,
      {
        duration: 1,
        fill: colors.buildings.night[1]
      },
      0
    )
    .to(
      city1,
      {
        duration: 1,
        fill: colors.buildings.night[0]
      },
      0
    )
    .to(
      streets,
      {
        duration: 1,
        fill: colors.street.night
      },
      0
    )
    .to(
      streetLines,
      {
        duration: 1,
        fill: colors.streetLine.night
      },
      0
    );
}

function change() {
  if (state.cooldown) return;

  state.cooldown = true;

  // wait 1.5 second before allowing the user to click again
  setTimeout(() => {
    state.cooldown = false;
  }, 1500);

  // toggle the class 'checked' to the toggle
  toggle.classList.toggle("checked");
  state.isDay ? changeToNight() : changeToDay();
  state.isDay = !state.isDay;
}

function playPause() {
  if (!state.isPlaying) {
    audio.play();
    playStatus.src = "./pause.svg";
  } else {
    audio.pause();
    playStatus.src = "./play.svg";
  }

  state.isPlaying = !state.isPlaying;
}

// listeners
toggle.addEventListener("click", change, false);
play.addEventListener("click", playPause, false);
