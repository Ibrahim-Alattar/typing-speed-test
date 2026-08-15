import { isCharCorrect } from "./isCharCorrect.js";

export function createErrorTracker(passage) {
  let errorIndexSet = new Set();

  return {
    trackError(typedText) {

      for (let i = 0; i < typedText.length; i++) {
        if (!isCharCorrect(passage, typedText, i)) {
          errorIndexSet.add(i);
        }
      }
    },

    getErrorCount() {
      return errorIndexSet.size;
    },
  };
}