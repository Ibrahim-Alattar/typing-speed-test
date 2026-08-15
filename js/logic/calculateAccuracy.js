export function calculateAccuracy(correctChars, totalCharsTyped) {
  if (!totalCharsTyped || totalCharsTyped <= 0) return 0;

  const accuracy = (correctChars / totalCharsTyped) * 100;
  return Math.min(100, Math.round(accuracy));
}