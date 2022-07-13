const hangman = [
    `  
\xa0+---+<br>
\xa0|\xa0\xa0\xa0|<br>
\xa0\xa0\xa0\xa0\xa0|<br>
\xa0\xa0\xa0\xa0\xa0|<br>
\xa0\xa0\xa0\xa0\xa0|<br>
\xa0\xa0\xa0\xa0\xa0|<br>
  =========
  `,
    `  
\xa0+---+<br>
\xa0|\xa0\xa0\xa0|<br>
\xa0O\xa0\xa0\xa0|<br>
\xa0\xa0\xa0\xa0\xa0|<br>
\xa0\xa0\xa0\xa0\xa0|<br>
\xa0\xa0\xa0\xa0\xa0|<br>
=========
  `,
    ` 
\xa0+---+<br>
\xa0|\xa0\xa0\xa0|<br>
\xa0O\xa0\xa0\xa0|<br>
\xa0|\xa0\xa0\xa0|<br>
\xa0\xa0\xa0\xa0\xa0|<br>
\xa0\xa0\xa0\xa0\xa0|<br>
=========
  `,
    `  
\xa0+---+<br>
\xa0|\xa0\xa0\xa0|<br>
\xa0O\xa0\xa0\xa0|<br>
/|\xa0\xa0\xa0|<br>
\xa0\xa0\xa0\xa0\xa0\|<br>
\xa0\xa0\xa0\xa0\xa0\|<br>
=========
  `,
    `  
\xa0+---+<br>
\xa0|\xa0\xa0\xa0|<br>
\xa0O\xa0\xa0\xa0|<br>
/|\\\xa0\xa0|<br>
\xa0\xa0\xa0\xa0\xa0\|<br>
\xa0\xa0\xa0\xa0\xa0\|<br>
=========
  `,
    `  
\xa0+---+<br>
\xa0|\xa0\xa0\xa0|<br>
\xa0O\xa0\xa0\xa0|<br>
/|\\\xa0\xa0|<br>
/\xa0\xa0\xa0\xa0|<br>
\xa0\xa0\xa0\xa0\xa0|<br>
=========
  `,
    `  
\xa0+---+<br>
\xa0|\xa0\xa0\xa0|<br>
\xa0O\xa0\xa0\xa0|<br>
/|\\\xa0\xa0|<br>
/\xa0\\\xa0\xa0|<br>
\xa0\xa0\xa0\xa0\xa0|<br>
=========
  `
];

const sentences = [
    { sen: "basketball", cat: "sport", lvl: "easy" },
    { sen: "football", cat: "sport", lvl: "easy" },
    { sen: "elephant", cat: "animal", lvl: "easy" },
    { sen: "tiger", cat: "animal", lvl: "easy" },
    { sen: "java script", cat: "coding language", lvl: "medium" },
    { sen: "type script", cat: "coding language", lvl: "medium" },
    { sen: "python", cat: "coding language", lvl: "easy" },
    { sen: "visual studio code", cat: "code editor", lvl: "hard" },
    { sen: "matrix", cat: "movie", lvl: "easy" },
    { sen: "pulp fiction", cat: "movie", lvl: "medium" },
    { sen: "forrest gump", cat: "movie", lvl: "medium" },
    { sen: "harry potter", cat: "movie", lvl: "easy" },
    { sen: "spider-man: home coming", cat: "movie", lvl: "hard" },
    { sen: "The Lord of the Rings: The Return of the King", cat: "movie", lvl: "insane" },
]

const current_sentence = sentences[Math.floor(Math.random() * sentences.length)];

//correctly guessed letter storen in lowercase
var correctlyGuessed = [];
var toGuess = new Set(current_sentence.sen.split(" ").join("").toUpperCase().split(""));
toGuess.delete('-');
toGuess.delete(':');
toGuess.delete('.');
var lives = hangman.length - 1;


function load() {
    document.getElementById("title").innerHTML += "[" + current_sentence.cat + "\xa0-\xa0" + current_sentence.lvl + "]";
    showHiddenLetters();
    showLetterButtons();
    showLives();
}

function showHiddenLetters() {
    let hidden_sentence = "";

    for (let i = 0; i < current_sentence.sen.length; i++) {
        let current_letter = current_sentence.sen.charAt(i);
        if (current_letter == ' ') {
            hidden_sentence += "\xa0";
        }
        else if (correctlyGuessed.includes(current_letter.toUpperCase())) {
            hidden_sentence += current_letter;
        }
        else if (['-', ':', ','].includes(current_letter)) {
            hidden_sentence += current_letter;
        }
        else {
            hidden_sentence += "_";
        }
    }

    var guessed_letters = document.getElementById("guessed_letters");
    guessed_letters.innerHTML = "<p>" + hidden_sentence + "</p>";
}

function showLetterButtons() {
    var letters_div = document.getElementById("letters");

    for (let i = 65; i < 91; i++) {
        letters_div.innerHTML += "<div class=\"letter-button\" onclick=\"checkLetter(this)\">" + String.fromCharCode(i) + "</div>";
    }
}

function showLives() {
    var lifes_div = document.getElementById("lifes");
    lifes_div.innerHTML = "<p>mistakes left: " + lives + "</p><p>" + hangman[hangman.length - lives - 1] + "</p>";
}

function checkLetter(button) {
    let letter = button.innerHTML.toUpperCase();
    if (current_sentence.sen.toUpperCase().includes(letter)) {
        button.style.background = "green";
        disable_button(button);
        correctlyGuessed.push(letter);
        showHiddenLetters();
        toGuess.delete(letter);

        if (toGuess.size == 0) {
            document.getElementById("lifes").innerHTML += "<p id=\"game-won\">you won</p>";
            document.getElementById("lifes").innerHTML += "<p id=\"new-game-button\" onclick=\"window.location.reload(true)\">[new game]</p>";
            for (let elem of document.getElementsByClassName("letter-button")) {
                disable_button(elem);
            }
        }
    }
    else {
        button.style.background = "red";
        disable_button(button);

        lives -= 1;
        showLives();

        if (lives == 0) {
            document.getElementById("guessed_letters").innerHTML = current_sentence.sen;
            document.getElementById("lifes").innerHTML += "<p id=\"game-over\">you lost</p>";
            document.getElementById("lifes").innerHTML += "<p id=\"new-game-button\" onclick=\"window.location.reload(true)\">[new game]</p>";
            for (let elem of document.getElementsByClassName("letter-button")) {
                disable_button(elem);
            }
        }
    }

}

function disable_button(button) {
    button.style.cursor = "not-allowed";
    button.setAttribute("onclick", "");
}