import { isCharCorrect } from "../logic/isCharCorrect.js";

export function updatePassageStyling(
  typedText,
  passage
) {
  const passageEl =
    document.querySelector(".passage");

  const charSpans =
    passageEl.querySelectorAll("span");

  charSpans.forEach((span, index) => {
    span.classList.remove(
      "current",
      "correct",
      "incorrect"
    );

    if (index < typedText.length) {
      const correct =
        isCharCorrect(
          passage,
          typedText,
          index
        );

      span.classList.add(
        correct
          ? "correct"
          : "incorrect"
      );
    } else if (
      index === typedText.length
    ) {
      span.classList.add("current");
    }
  });
}