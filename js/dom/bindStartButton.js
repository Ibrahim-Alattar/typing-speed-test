export function bindStartButton(testState) {
  const startBtn =
    document.querySelector("#startBtn");

  const overlay =
    document.querySelector(".overlay");

  const textarea =
    document.querySelector("textarea");

  function startTest() {
    if (
      testState.getStatus() === "typing"
    ) {
      return;
    }

    overlay.classList.add("closed");

    textarea.focus();
  }

  startBtn.addEventListener(
    "click",
    startTest
  );

  overlay.addEventListener(
    "click",
    startTest
  );
}