import { getBestWPM } from "./getBestWPM.js";

export function setBestWPM(newWPM) {
  const currentBestSpeed = getBestWPM();

  if (newWPM > currentBestSpeed) {
    localStorage.setItem(
      "bestWPM",
      String(newWPM)
    );

    return true;
  }

  return false;
}