function calculateNextReviewDate(repetitions, isCorrectGuess) {
    const hours = 1;
    const minutes = 60;
    const seconds = 60;
    const milliseconds = 1000;
    const millisecondsInADay = hours * minutes * seconds * milliseconds; // Number of milliseconds in a day
    const initialIntervalInDays = 1;
    const maxRepetitionsBeforeDoubling = 15;
    const doubleIntervalFactor = 1.5;
  
    if (repetitions === 1 || !isCorrectGuess) {
      // First review or wrong answer, return the initial interval (1 day)
      return new Date(Date.now() + initialIntervalInDays * millisecondsInADay);
    }
  
    if (repetitions >= maxRepetitionsBeforeDoubling) {
      // If repetitions are more than or equal to 15, return double the current interval
      return new Date(
        Date.now()  * doubleIntervalFactor * millisecondsInADay
      );
    }
  
    // Calculate the next interval based on the repetitions (1, 2, 4, 8, ...)
    const nextInterval = Math.pow(doubleIntervalFactor, repetitions - 1);
  
    // Calculate the next review date by adding the nextInterval to the current date
    return new Date(Date.now() + nextInterval * millisecondsInADay);
  }

module.exports = calculateNextReviewDate;
  