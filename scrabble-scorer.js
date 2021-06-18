// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85

const input = require("readline-sync");

let userWord = "";

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
    for (const pointValue in oldPointStructure) {
      if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
  console.log("Let's play some Scrabble!" + "\n");
  userWord = input.question("Enter a word to score: ");
  // console.log(oldScrabbleScorer(userWord))   
}

function simpleScore(word) {
  let score = word.toLowerCase().length;
  return score;
}

// console.log(simpleScore("userWord"));

let vowelBonusScore = function(word) {
  let score = word.toLowerCase().length;
  let total = 0;
  let vowels = ['a','e','i','o','u'];
  for (let i = 0; i < word.length; i++) {
    if (vowels.includes(word[i])) {
    total += 3 
  } else {
  total += 1 
  }
  }
  return total;
}

let scrabbleScore = "";



const scoringAlgorithms = [
  { 
    name: 'Simple Score',
    description: 'Each letter is worth 1 point.',
    scoringFunction: simpleScore
  }, 
  { 
    name: 'Bonus Vowels',
    description: 'Vowels are 3 pts, consonants are 1 pt.',
    scoringFunction: vowelBonusScore
  },
  { 
    name: 'Scrabble',
    description: 'The traditional scoring algorithm.',
    scoringFunction: oldScrabbleScorer
  }];

function scorerPrompt() {
  let scorer = input.question(`Which scoring algorithm would you like to use? \n
0 - Simple: One point per character
1 - Vowel Bonus: Vowels are wort 3 points
2 - Scrabble: Uses scrabble point system
Enter 0,1,2: `);

  console.log(`Score for ${userWord}: ${scoringAlgorithms[scorer].scoringFunction(userWord)}`)
}

function transform(obj) {
  let newPointStructure = {};
  for (let key in obj) { 
    let letters = obj[key]
    // console.log(key);
    // console.log(obj[key]);
   for (let i = 0; i < letters.length; i++) {
     newPointStructure[letters[i].toLowerCase()] = Number(key);
   }
  }

return newPointStructure;
};

let newPointStructure = transform(oldPointStructure);

function runProgram() {
   initialPrompt();
   scorerPrompt();
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScore: simpleScore,
   vowelBonusScore: vowelBonusScore,
   scrabbleScore: scrabbleScore,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	 runProgram: runProgram,
	 scorerPrompt: scorerPrompt
};