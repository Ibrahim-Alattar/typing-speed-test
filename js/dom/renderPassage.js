export function renderPassage(passage) {
  const passageContainer =
    document.querySelector(".passage");

  const fragment =
    document.createDocumentFragment();

  passageContainer.textContent = "";

  for (const character of passage) {
    const characterSpan =
      document.createElement("span");

    characterSpan.textContent =
      character;

    fragment.append(characterSpan);
  }

  passageContainer.append(fragment);
}