export function getCurrentDifficulty() {
  const activeButton =
    document.querySelector(
      ".difficulty-btns button.active"
    );

  if (activeButton) {
    return activeButton.value;
  }

  const select =
    document.querySelector(
      ".difficulty-select"
    );

  return select?.value ?? "hard";
}

export function getCurrentMode() {
  const activeButton =
    document.querySelector(
      ".mode-btns button.active"
    );

  if (activeButton) {
    return activeButton.value;
  }

  const select =
    document.querySelector(
      ".mode-select"
    );

  return select?.value ?? "passage";
}