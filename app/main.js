"use strict";

function saveWord() {
    let word = document.getElementById("word").value;
    Founded.addToFounded(word);
}
function checkWord() {
    let word = document.getElementById("word").value;
    let check = new WordChecker(word);
    let results = check.results();
    if (results.length > 0) {
        document.getElementById("save_button").disabled = false
        Results.addWord(word, results);
    }
    else {
        document.getElementById("save_button").disabled = true
        Results.clear();
    }
}

function main() {
    Founded.founded_list = document.cookie
        .split('; ')
        .find((row) => row.startsWith('founded='))
        ?.split('=')[1].split(',');
    console.log(Founded.document.cookie)
    console.log(Founded.founded_list)
    if (isNaN(Founded.founded_list)) {
        Founded.founded_list = [];
    }
    Founded.addAllToFounded();
    checkWord();
}

main();
