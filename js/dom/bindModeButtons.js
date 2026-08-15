import { getRandomPassage } from "../logic/getRandomPassage.js";
import { createErrorTracker } from "../logic/createErrorTracker.js";
import { renderPassage } from "./renderPassage.js";

export function bindModeButtons(
  testState,
  passages,
  errorTrackerRef
) {
  const container =
    document.querySelector(".mode-btns");

  const buttons =
    container.querySelectorAll(
      "button[data-mode]"
    );

  const select =
    document.querySelector(".mode-select");

  container.addEventListener("click", (e) => {
    const clickedButton =
      e.target.closest(
        "button[data-mode]"
      );

    if (!clickedButton) return;

    const mode = clickedButton.value;

    changeMode(
      mode,
      testState,
      passages,
      errorTrackerRef
    );

    select.value = mode;

    buttons.forEach((button) => {
      button.classList.toggle(
        "active",
        button === clickedButton
      );
    });
  });
}

export function bindModeSelect(
  testState,
  passages,
  errorTrackerRef
) {
  const select =
    document.querySelector(".mode-select");

  const buttons =
    document.querySelectorAll(
      ".mode-btns button[data-mode]"
    );

  select.addEventListener("change", (e) => {
    const mode = e.target.value;

    changeMode(
      mode,
      testState,
      passages,
      errorTrackerRef
    );

    buttons.forEach((button) => {
      button.classList.toggle(
        "active",
        button.value === mode
      );
    });
  });
}

function changeMode(
  mode,
  testState,
  passages,
  errorTrackerRef
) {
  testState.setMode(mode);
  testState.reset();

  const randomPassage =
    getRandomPassage(
      passages,
      testState.getDifficulty()
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

  resetUI(mode);
}

function resetUI(mode) {
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
    mode === "timed"
      ? "1:00"
      : "0:00";
}