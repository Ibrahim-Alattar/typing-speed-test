import { createTestState } from "./js/logic/createTestState.js";
import { createErrorTracker } from "./js/logic/createErrorTracker.js";
import { getPassages } from "./js/logic/getPassages.js";
import { getRandomPassage } from "./js/logic/getRandomPassage.js";
import { getBestWPM } from "./js/logic/getBestWPM.js";
import { renderPassage } from "./js/dom/renderPassage.js";

import {
  bindDifficultyButtons,
  bindDifficultySelect,
} from "./js/dom/bindDifficultyButtons.js";

import {
  bindModeButtons,
  bindModeSelect,
} from "./js/dom/bindModeButtons.js";

import { bindTextarea } from "./js/dom/bindTextarea.js";
import { bindStartButton } from "./js/dom/bindStartButton.js";
import { updateLiveStats } from "./js/dom/updateLiveStats.js";
import { bindRestartButtons } from "./js/dom/bindRestartButtons.js";

import {
  getCurrentDifficulty,
  getCurrentMode,
} from "./js/dom/getCurrentSettings.js";


async function handleProject() {

  const passages = await getPassages();

  const testState = createTestState();

  document.querySelector("#bestScore")
    .textContent = String(getBestWPM());


  // Get initial settings from UI
  const difficulty = getCurrentDifficulty();
  const mode = getCurrentMode();

  testState.setDifficulty(difficulty);
  testState.setMode(mode);


  // Get initial passage
  const randomPassage = getRandomPassage(
    passages,
    difficulty
  );

  testState.setPassage(
    randomPassage.text
  );


  const errorTrackerRef = {
    current: createErrorTracker(
      randomPassage.text
    ),
  };


  renderPassage(
    randomPassage.text
  );


  // Difficulty
  bindDifficultyButtons(
    testState,
    passages,
    errorTrackerRef
  );

  bindDifficultySelect(
    testState,
    passages,
    errorTrackerRef
  );


  // Mode
  bindModeButtons(
    testState,
    passages,
    errorTrackerRef
  );

  bindModeSelect(
    testState,
    passages,
    errorTrackerRef
  );


  // Typing
  bindTextarea(
    testState,
    errorTrackerRef
  );


  // Start
  bindStartButton(testState);


  // Live stats
  setInterval(() => {

    updateLiveStats(
      testState,
      errorTrackerRef.current
    );

  }, 250);


  // Restart / results
  bindRestartButtons(
    testState,
    errorTrackerRef,
    passages
  );
}


handleProject();