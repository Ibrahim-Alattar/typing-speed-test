export function calculateWPM(
  correctChars,
  timeElapsedInSeconds
) {
  if (
    !timeElapsedInSeconds ||
    timeElapsedInSeconds <= 0
  ) {
    return 0;
  }

  const wpm =
    (correctChars / 5) /
    (timeElapsedInSeconds / 60);

  return Math.round(wpm);
}