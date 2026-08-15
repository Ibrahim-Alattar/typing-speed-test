import { getElapsedSeconds } from "../logic/getElapsedSeconds.js";
import { calculateWPM } from "../logic/calculateWPM.js";
import { calculateAccuracy } from "../logic/calculateAccuracy.js";
import { showResults } from "./showResults.js";


export function updateLiveStats(
  testState,
  errorTracker
) {

  if (
    testState.getStatus() !== "typing"
  ) {
    return;
  }


  const elapsed =
    getElapsedSeconds(
      testState.getStartTime()
    );


  const mode =
    testState.getMode();


  const typedText =
    testState.getTypedText();


  const errorCount =
    errorTracker.getErrorCount();


  testState.setErrorCount(
    errorCount
  );


  let displayTime;


  if (mode === "timed") {

    displayTime = Math.max(
      0,
      60 - elapsed
    );


    if (displayTime <= 0) {

      testState.markFinished();

      showResults(testState);

      return;
    }

  } else {

    displayTime = elapsed;

  }


  // Time
  const timeEl =
    document.querySelector("#time");

  if (timeEl) {

    timeEl.textContent =
      formatTime(displayTime);
  }


  // Correct characters
  const correctChars =
    Math.max(
      0,
      typedText.length -
      errorCount
    );


  // WPM
  const wpmEl =
    document.querySelector("#WPM");

  if (wpmEl) {

    const wpm =
      calculateWPM(
        correctChars,
        elapsed
      );

    wpmEl.textContent =
      String(wpm);
  }


  // Accuracy
  const accuracyEl =
    document.querySelector("#accuracy");

  if (accuracyEl) {

    const accuracy =
      calculateAccuracy(
        correctChars,
        typedText.length
      );

    accuracyEl.textContent =
      accuracy + "%";
  }
}


function formatTime(seconds) {

  const total =
    Math.floor(seconds);

  const minutes =
    Math.floor(total / 60);

  const remainingSeconds =
    total % 60;


  return `${minutes}:${remainingSeconds
    .toString()
    .padStart(2, "0")}`;
}