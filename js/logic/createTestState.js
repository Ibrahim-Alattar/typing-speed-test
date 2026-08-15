export function createTestState() {
  let status = "idle";
  let typedText = "";
  let startTime = null;
  let difficulty = null;
  let mode = null;
  let passage = null;
  let errorCount = 0;

  return {
    markStarted() {
      status = "typing";
      startTime = Date.now();
    },

    markFinished() {
      status = "finished";
    },

    reset() {
      status = "idle";
      typedText = "";
      startTime = null;
      errorCount = 0;
    },

    getStatus() {
      return status;
    },

    getStartTime() {
      return startTime;
    },

    setDifficulty(value) {
      difficulty = value;
    },

    getDifficulty() {
      return difficulty;
    },

    setMode(value) {
      mode = value;
    },

    getMode() {
      return mode;
    },

    updateTypedText(value) {
      typedText = value;
    },

    getTypedText() {
      return typedText;
    },

    setPassage(value) {
      passage = value;
    },

    getPassage() {
      return passage;
    },

    setErrorCount(value) {
      errorCount = value;
    },

    getErrorCount() {
      return errorCount;
    },
  };
}