import { getRandomPassage } from "../logic/getRandomPassage.js";
import { createErrorTracker } from "../logic/createErrorTracker.js";
import { renderPassage } from "./renderPassage.js";

export function bindDifficultyButtons(
  testState,
  passages,
  errorTrackerRef
) {
  const container =
    document.querySelector(".difficulty-btns");

  const buttons =
    container.querySelectorAll(
      "button[data-difficulty]"
    );

  const select =
    document.querySelector(".difficulty-select");

  container.addEventListener("click", (e) => {
    const clickedButton =
      e.target.closest(
        "button[data-difficulty]"
      );

    if (!clickedButton) return;

    const difficulty =
      clickedButton.value;

    changeDifficulty(
      difficulty,
      testState,
      passages,
      errorTrackerRef
    );

    select.value = difficulty;

    buttons.forEach((button) => {
      button.classList.toggle(
        "active",
        button === clickedButton
      );
    });
  });
}

export function bindDifficultySelect(
  testState,
  passages,
  errorTrackerRef
) {
  const select =
    document.querySelector(
      ".difficulty-select"
    );

  const buttons =
    document.querySelectorAll(
      ".difficulty-btns button[data-difficulty]"
    );

  select.addEventListener("change", (e) => {
    const difficulty = e.target.value;

    changeDifficulty(
      difficulty,
      testState,
      passages,
      errorTrackerRef
    );

    buttons.forEach((button) => {
      button.classList.toggle(
        "active",
        button.value === difficulty
      );
    });
  });
}

function changeDifficulty(
  difficulty,
  testState,
  passages,
  errorTrackerRef
) {
  testState.setDifficulty(difficulty);
  testState.reset();

  const randomPassage =
    getRandomPassage(
      passages,
      difficulty
    );

  testState.setPassage(
    randomPassage.text
  );

  errorTrackerRef.current =
    createErrorTracker(
      randomPassage.text
    );

  renderPassage(
    randomPassage.text
  );

  resetUI();
}

function resetUI() {
  const textarea =
    document.querySelector("textarea");

  const overlay =
    document.querySelector(".overlay");

  const results =
    document.querySelector(".results");

  textarea.value = "";

  overlay.classList.remove("closed");

  results.classList.remove("show");

  document.querySelector("#WPM").textContent =
    "0";

  document.querySelector("#accuracy").textContent =
    "0%";

  document.querySelector("#time").textContent =
    "0:00";
}