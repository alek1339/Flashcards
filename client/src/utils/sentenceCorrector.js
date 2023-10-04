export function countMistakes(word1, word2) {
  // Compare two words and return the number of differences
  return word1
    .split("")
    .reduce((acc, char, index) => (char !== word2[index] ? acc + 1 : acc), 0);
}

export function isCorrectSentence(backOfCard, userInput) {
  const backWords = backOfCard.split(" ");
  const userWords = userInput.split(" ");

  if (backWords.length !== userWords.length) {
    return false; // Lengths must match for a correct sentence
  }

  for (let i = 0; i < backWords.length; i++) {
    const backWord = backWords[i].toLowerCase(); // Convert to lowercase
    const userWord = userWords[i].toLowerCase(); // Convert to lowercase

    if (backWord.length >= 4) {
      if (countMistakes(backWord, userWord) > 1) {
        return false; // More than one mistake in a word with 4 or more characters
      }
    } else {
      if (backWord !== userWord) {
        return false; // Exact match required for words with less than 4 characters
      }
    }
  }

  return true; // The sentence is considered correct
}
