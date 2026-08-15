import { createErrorTracker } from "../logic/createErrorTracker.js";
import { getRandomPassage } from "../logic/getRandomPassage.js";
import { renderPassage } from "./renderPassage.js";
import { bindTextarea } from "./bindTextarea.js";


export function bindRestartButtons(
  testState,
  errorTrackerRef,
  passages
) {

  const restartBtn =
    document.querySelector("#restart");

  const beatBtn =
    document.querySelector("#beat-this-score");


  restartBtn.addEventListener(
    "click",
    restartTest
  );

  beatBtn.addEventListener(
    "click",
    restartTest
  );


  function restartTest() {

    // Reset test state
    testState.reset();


    // Get a NEW passage
    const randomPassage =
      getRandomPassage(
        passages,
        testState.getDifficulty()
      );


    testState.setPassage(
      randomPassage.text
    );


    // Create new error tracker
    errorTrackerRef.current =
      createErrorTracker(
        randomPassage.text
      );


    // Render new passage
    renderPassage(
      randomPassage.text
    );


    // Replace textarea
    const oldTextarea =
      document.querySelector("textarea");

    const newTextarea =
      oldTextarea.cloneNode(true);

    oldTextarea.parentNode.replaceChild(
      newTextarea,
      oldTextarea
    );


    // Bind input event again
    bindTextarea(
      testState,
      errorTrackerRef
    );


    // Hide results
    document
      .querySelector(".results")
      .classList.remove("show");


    // Show test page
    document
      .querySelector(".test-page")
      .classList.remove("hidden");


    // Show overlay
    document
      .querySelector(".overlay")
      .classList.remove("closed");


    // Reset textarea
    newTextarea.value = "";


    // Reset live stats
    document.querySelector("#WPM")
      .textContent = "0";

    document.querySelector("#accuracy")
      .textContent = "0%";


    document.querySelector("#time")
      .textContent =
      testState.getMode() === "timed"
        ? "1:00"
        : "0:00";
  }
}