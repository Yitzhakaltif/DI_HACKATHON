let movies = [
    "spiderman",
    "batman",
    "superman",
    "wonderwoman",
    "lionking",
    "Ironman",
    "avatar",
    "titanic",
    "jumanji",
]

let answer = '';
let maxWrong = 6;
let mistakes = 0;
let guessed = [];
let wordStatus = "_" 

function randomWord() {
    answer = movies[Math.floor(Math.random() * movies.length)];
}
function generateButtons() {
    let buttonsHTML = "abcdefghijklmnopqrstuvwxyz".split("").map(letter =>
      `
        <button
          class="btn btn-lg btn-primary m-2"
          id='` + letter + `'
          onClick="handleGuess('` + letter + `')"
        >
          ` + letter + `
        </button>
      `)
  
    document.getElementById('keyboard').innerHTML = buttonsHTML;
  }
  function handleGuess(chosenLetter) {
    guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null;
    document.getElementById(chosenLetter).setAttribute('disabled', true);
  
    if (answer.indexOf(chosenLetter) >= 0) {
      guessedWord();
      checkIfGameWon();
    } else if (answer.indexOf(chosenLetter) === -1) {
      mistakes++;
      updateMistakes();
      checkIfGameLost();
      updateHangman();
    }
  }
  
  function updateHangman() {
    document.getElementById('hangmanPic').src = './images/' + mistakes + '.jpg';
  }
  
  function checkIfGameWon() {
    if (wordStatus === answer) {
      document.getElementById('keyboard2').innerHTML = "Congratulations, you saved the man!!!!!!";
    }
  }
  
  function checkIfGameLost() {
    if (mistakes === maxWrong) {
      document.getElementById('wordContent').innerHTML = 'The answer was: ' + answer;
      document.getElementById('keyboard').innerHTML = "Unfortunately, you lost the man's life....";
    }
  }
  
  function guessedWord() {
    wordStatus = answer.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter : " _ ")).join('');
  
    document.getElementById('wordContent').innerHTML = wordStatus;
  }
  
  function updateMistakes() {
    document.getElementById('mistakes').innerHTML = mistakes;
  }
  
  function reset() {
    mistakes = 0;
    guessed = [];
    document.getElementById('hangmanPic').src = './images/3amood.jpg';
  
    randomWord();
    guessedWord();
    updateMistakes();
    generateButtons();
  }
  
  document.getElementById('maxWrong').innerHTML = maxWrong;
  