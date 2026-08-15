import { updatePassageStyling } from "./updatePassageStyling.js";
import { showResults } from "./showResults.js";


export function bindTextarea(
  testState,
  errorTrackerRef
) {

  const textarea =
    document.querySelector("textarea");

  const overlay =
    document.querySelector(".overlay");


  textarea.addEventListener(
    "input",
    (e) => {

      // Start timer on first character
      if (
        testState.getStatus() === "idle"
      ) {

        testState.markStarted();

        overlay.classList.add(
          "closed"
        );
      }


      const typedText =
        e.target.value;


      testState.updateTypedText(
        typedText
      );


      // Track errors
      errorTrackerRef.current.trackError(
        typedText
      );


      testState.setErrorCount(
        errorTrackerRef.current.getErrorCount()
      );


      // Update passage appearance
      updatePassageStyling(
        typedText,
        testState.getPassage()
      );


      // Passage mode finished
      if (
        testState.getMode() === "passage" &&
        typedText.length ===
        testState.getPassage().length
      ) {

        testState.markFinished();

        showResults(testState);
      }

    }
  );
}