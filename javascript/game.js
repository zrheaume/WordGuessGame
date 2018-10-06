//Guess Game Homework -- JavaScript
//Zach Rheaume
//\__|-*-|__/\__|-*-|__/\__|-*-|__/\__|-*-|__/\__|-*-|__/\__|-*-|__/\__|-*-|__/\__|-*-|__/\__|-*-|__/\__|-*-|__/


//Create an initial array for a word bank
//\__|-*-|__/\__|-*-|__/\__|-*-|__/\__|-*-|__/\__|-*-|__/\__|-*-|__/\__|-*-|__/\__|-*-|__/\__|-*-|__/\__|-*-|__/

var wordBank = ["apathy","accolades","anthrax","anticlimactic","aspiration","bittersweet","bunion","baffling","catatonic","catastrophe","collectable","deniability","daunting","dutifully","energized","epileptic","eclipse","fallacy",];
var letters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];

//Define function to pick a word
//\__|-*-|__/\__|-*-|__/\__|-*-|__/\__|-*-|__/\__|-*-|__/\__|-*-|__/\__|-*-|__/\__|-*-|__/\__|-*-|__/\__|-*-|__/

function pickWord(){
    var wordPicker = Math.floor( Math.random() * wordBank.length);
    return wordBank[wordPicker];
}

//Define function to hide a word
//\__|-*-|__/\__|-*-|__/\__|-*-|__/\__|-*-|__/\__|-*-|__/\__|-*-|__/\__|-*-|__/\__|-*-|__/\__|-*-|__/\__|-*-|__/

function hideWord(word){
    var hiddenWord = [];
    for( z = 0; z < word.length; z++){
        hiddenWord.push('__');
    }
    return hiddenWord;
}

//Function to parse a string out into an array
//\__|-*-|__/\__|-*-|__/\__|-*-|__/\__|-*-|__/\__|-*-|__/\__|-*-|__/\__|-*-|__/\__|-*-|__/\__|-*-|__/\__|-*-|__/

function turnToArray(toBeArrayed){
    var newArray = [];
    for( i = 0; i < toBeArrayed.length; i++ ){
        newArray.push(toBeArrayed[i]);
    }
    return newArray;
}

//Define function to test wither the first argument is an element in the array
//\__|-*-|__/\__|-*-|__/\__|-*-|__/\__|-*-|__/\__|-*-|__/\__|-*-|__/\__|-*-|__/\__|-*-|__/\__|-*-|__/\__|-*-|__/
function arrayCheck(toBeChecked, arrayInQuestion){
    for( x = 0; x < arrayInQuestion.length; x++){
        if(arrayInQuestion[x] == toBeChecked){
            return true;
        }
    }
}

//Function to update display
//\__|-*-|__/\__|-*-|__/\__|-*-|__/\__|-*-|__/\__|-*-|__/\__|-*-|__/\__|-*-|__/\__|-*-|__/\__|-*-|__/\__|-*-|__/
function toDisplay(guessedWord){
    tempWord = guessedWord;
    wordDisp.textContent = tempWord.join('    ');
}

//Function to reset to initial conditions and pick a new word
//\__|-*-|__/\__|-*-|__/\__|-*-|__/\__|-*-|__/\__|-*-|__/\__|-*-|__/\__|-*-|__/\__|-*-|__/\__|-*-|__/\__|-*-|__/
function resetWord(){
    guessesMade = [];
    guessesRemaining = 12;
    currentWord = pickWord();
    correctGuesses = [];
    guessedWord = hideWord(currentWord);
    displayWord = hideWord(currentWord).join('   ');
    // console.log(currentWord);
    wordDisp.textContent = displayWord;
    guessesMadeDisp.textContent = guessesMade;
    guessesRemainingDisp.textContent = guessesRemaining;
}

//Set various initial paramaters (win count, loss count, guesses made,
//guesses remaining first word, and a hidden display for the word)
//\__|-*-|__/\__|-*-|__/\__|-*-|__/\__|-*-|__/\__|-*-|__/\__|-*-|__/\__|-*-|__/\__|-*-|__/\__|-*-|__/\__|-*-|__/
var lossCount = 0;
var winCount = 0;

var guessesMade = [];
var guessesRemaining = 12;
var currentWord = pickWord();
var correctGuesses = [];
var guessedWord = hideWord(currentWord);
var displayWord = hideWord(currentWord).join('    ');

// console.log(currentWord);



//Create an onKeyUp event listener to record keystrokes
//\__|-*-|__/\__|-*-|__/\__|-*-|__/\__|-*-|__/\__|-*-|__/\__|-*-|__/\__|-*-|__/\__|-*-|__/\__|-*-|__/\__|-*-|__/


document.onkeyup = function(event){
    //Display key in console 

    //Check to see if the key is a letter using the letters array
    if(letters.indexOf(event.key) !== -1){

        //Set the verified letter to guess Letter
        var guessLetter = event.key;
        // console.log(guessLetter);

        //Use the arrayCheck function to see if  guessLetter has already been guessed
        if(guessesMade.indexOf(guessLetter) !== -1 ){
            alert("You've already guessed that");
        }
//\__|-*-|__/\__|-*-|__/\__|-*-|__/\__|-*-|__/\__|-*-|__/\__|-*-|__/\__|-*-|__/\__|-*-|__/\__|-*-|__/\__|-*-|__/

        //If the letter has not already been guessed, execute this
        else{
            guessesMade.push(guessLetter);
            guessesMadeDisp.textContent = guessesMade;

            //If the arrayCheck 
            if(arrayCheck(guessLetter, currentWord)===true){

                for( a = 0; a < currentWord.length; a++){
                    if(currentWord[a] == guessLetter){
                        correctGuesses.push(guessLetter);
                        guessedWord[a] = guessLetter;
                    }
                }
                toDisplay(guessedWord);
                
                
            }
            else{
                guessesRemaining--;
                guessesRemainingDisp.textContent = guessesRemaining;
                if(guessesRemaining < 1){
                    lossCount++;
                    lossCountDisp.textContent = lossCount;
                    alert("YOU LOST");
                    resetWord();
                }
            }
            if(correctGuesses.length === currentWord.length){
                winCount++;
                winCountDisp.textContent = winCount;
                toDisplay(guessedWord);
                alert("YOU WON");
                resetWord();
            }
        }

        }
    
        // console.log('Guesses made:  ' +  guessesMade);
        // console.log('Correct guesses:   ' + correctGuesses);
    }

    var winCountDisp = document.getElementById('win-count');
    var lossCountDisp = document.getElementById('loss-count');
    var wordDisp = document.getElementById('word-display');
    var guessesMadeDisp = document.getElementById('guesses-made');
    var guessesRemainingDisp = document.getElementById('guesses-remaining');
    
    //Push the values to the HTML page
    
    winCountDisp.textContent = winCount;
    lossCountDisp.textContent = lossCount;
    wordDisp.textContent = displayWord;
    guessesRemainingDisp.textContent = guessesRemaining;

