export function getElapsedSeconds(startTime) {
  if (startTime == null) {
    return 0;
  }

  return Math.floor(
    (Date.now() - startTime) / 1000
  );
}