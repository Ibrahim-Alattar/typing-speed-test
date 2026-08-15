export async function getPassages() {
  try {
    const response = await fetch("./data.json")
    if (!response.ok) {
      throw new Error("Request failed");
    }
    const passages = await response.json()
    return passages
  } catch (error) {
    console.error("Logging the error", error)
    throw error;
  }
}