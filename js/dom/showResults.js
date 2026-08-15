import { calculateWPM } from "../logic/calculateWPM.js";
import { calculateAccuracy } from "../logic/calculateAccuracy.js";
import { getElapsedSeconds } from "../logic/getElapsedSeconds.js";
import { getBestWPM } from "../logic/getBestWPM.js";
import { setBestWPM } from "../logic/setBestWPM.js";


export function showResults(testState) {
  const typedText =
    testState.getTypedText();

  const startTime =
    testState.getStartTime();

  const elapsed =
    getElapsedSeconds(startTime);

  const errorCount =
    testState.getErrorCount();


  const correctChars = Math.max(
    0,
    typedText.length - errorCount
  );


  const wpm = calculateWPM(
    correctChars,
    elapsed
  );


  const accuracy = calculateAccuracy(
    correctChars,
    typedText.length
  );


  /*
    Check the previous best BEFORE
    updating it.
  */
  const previousBest = getBestWPM();

  const isFirstTest =
    previousBest === 0;

  const isNewBest =
    wpm > previousBest;


  /*
    Save the new best if necessary.
  */
  if (isNewBest) {
    setBestWPM(wpm);
  }


  /*
    Update header Best Score.
  */
  document.querySelector("#bestScore")
    .textContent =
    String(
      Math.max(previousBest, wpm)
    );


  /*
    Update final numbers.
  */
  document.querySelector("#finalWPM")
    .textContent =
    String(wpm);

  document.querySelector("#finalAccuracy")
    .textContent =
    accuracy + "%";

  document.querySelector("#characters")
    .textContent =
    `${correctChars}/${typedText.length}`;


  /*
    Update the results content.
  */
  updateResultsContent(
    isFirstTest,
    isNewBest
  );


  /*
    Switch pages.
  */
  document
    .querySelector(".test-page")
    .classList.add("hidden");

  document
    .querySelector(".results")
    .classList.add("show");
}


function updateResultsContent(
  isFirstTest,
  isNewBest
) {
  const results =
    document.querySelector(".results");

  const icon =
    results.querySelector(".results-icon");

  const title =
    results.querySelector(".results-title");

  const description =
    results.querySelector(".results-description");

  const button =
    document.querySelector("#beat-this-score");


  /*
    FIRST EVER TEST
  */
  if (isFirstTest) {
    icon.src =
      "assets/images/icon-completed.svg";

    title.textContent =
      "Baseline Established";

    description.textContent =
      "You've set the bar. Now the real challenge begins - time to beat it.";

    button.innerHTML = `
      Beat This Score
      <img
        src="assets/images/icon-restart.svg"
        alt=""
      >
    `;

    return;
  }


  /*
    NEW PERSONAL BEST
  */
  if (isNewBest) {
    icon.src =
      "assets/images/desktop-results-new-personal-best.jpg";

    title.textContent =
      "New Personal Best!";

    description.textContent =
      "You've raised the bar. Keep pushing and see how much higher you can go.";

    button.innerHTML = `
      Keep Going
      <img
        src="assets/images/icon-restart.svg"
        alt=""
      >
    `;

    return;
  }


  /*
    NORMAL TEST AFTER FIRST TEST
  */
  icon.src =
    "assets/images/icon-completed.svg";

  title.textContent =
    "Test Complete";

  description.textContent =
    "Solid run. Keep practicing to beat your high score.";

  button.innerHTML = `
    Beat This Score
    <img
      src="assets/images/icon-restart.svg"
      alt=""
    >
  `;
}