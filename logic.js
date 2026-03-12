/**@typedef {string} ColorString - a string consisting only of the characters of WColor. */
const WColor = Object.freeze({
  GREEN: "G",
  YELLOW: "Y",
  GRAY: ".",
});

/**
 * Matches sequences of color patterns and returns their every corresponding valid guess.
 * @param {string} word - Today's Wordle word.
 * @param {string[]} wordList - Wordle's word list.
 * @param {ColorString[]} patterns - The desired color patterns to match against.
 * @returns {string[][]}
 */
function findSolution(word, wordList, patterns) {
  let matches = [];
  for (const pattern of patterns) {
    let valid = [];
    for (const guess of wordList) {
      if (revealGuess(guess, word) === pattern) {
        valid.push(guess);
      }
    }
    matches.push(valid);
  }
  return matches;
}

/**
 * Returns the color pattern of a simulated guess.
 * The string length of both guess and word must be the same.
 * @param {string} guess - The Wordle "guess" word.
 * @param {string} word - Today's Wordle word.
 * @returns {ColorString}
 */
function revealGuess(guess, word) {
  let colors = Array(guess.length).fill(WColor.GRAY);
  let tally = new Map();
  for (const ch of word) {
    tally.set(ch, (tally.get(ch) ?? 0) + 1);
  }

  // Find green first.
  for (let i = 0; i < guess.length; i++) {
    if (guess[i] === word[i]) {
      colors[i] = WColor.GREEN;
      tally.set(guess[i], tally.get(guess[i]) - 1);
    }
  }

  // Then match yellow.
  for (let i = 0; i < guess.length; i++) {
    if ((tally.get(guess[i]) ?? 0) > 0 && colors[i] === WColor.GRAY) {
      colors[i] = WColor.YELLOW;
      tally.set(guess[i], tally.get(guess[i]) - 1);
    }
  }

  return colors.join("");
}
