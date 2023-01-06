const ecran = document.querySelector(".ecran");
const ecranContent = document.querySelector(".ecranContent");
const keybord = document.querySelector(".keybord");
const btns = document.querySelectorAll(".btn");

let operation = "",
  work = true;

const keys = [];
const fillKeys = function () {
  btns.forEach((btn) => {
    keys.push(btn.dataset.btn);
  });
};
fillKeys();

const initEcran = function () {
  if (!operation) ecranContent.textContent = 0;
};

const displayOp = function (content) {
  operation = content;
  ecranContent.textContent = operation;
};
const calcResult = function (input) {
  const parWidth = ecran.getBoundingClientRect().width;
  /* if (
    (operation.length == 10 && parWidth <= 500) ||
    (operation.length == 20 && parWidth > 500)
  ) {
    work = false;
  } */
  if (input == "clear") {
    //work = true;
    operation = "";
    initEcran();
  } else {
    if (input == "Backspace") {
      //work = true;
      displayOp(operation.slice(0, operation.length - 1));
      initEcran();
    } else {
      if (input == "Enter") {
        console.log(operation);
        if (!operation) return;
        try {
          operation = operation.replace("^", "**");
          const result = eval(operation);
          displayOp(result);
          //work = true;
        } catch (err) {
          operation = "";
          initEcran();
        }
      } else {
        displayOp(operation + input);
      }
    }
  }
};

keybord.addEventListener("click", function (e) {
  const btnClicked = e.target.closest(".btn");
  if (!btnClicked) return;
  calcResult(btnClicked.dataset.btn);
});

window.addEventListener("keydown", function (e) {
  if (keys.includes(e.key) && work) {
    calcResult(e.key);
  }
});
