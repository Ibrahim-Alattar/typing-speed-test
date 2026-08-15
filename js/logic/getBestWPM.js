export function getBestWPM() {
  const bestSpeed = localStorage.getItem("bestWPM");

  return bestSpeed === null
    ? 0
    : Number(bestSpeed);
}