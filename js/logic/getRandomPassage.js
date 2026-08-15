export function getRandomPassage(texts, difficulty) {
  const passages = texts[difficulty];

  const randomIndex = Math.floor(Math.random() * passages.length);

  return passages[randomIndex];
}